package com.freelancer.freelancer_hiring_platform.contract;

import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.project.Project;
import com.freelancer.freelancer_hiring_platform.project.ProjectService;
import com.freelancer.freelancer_hiring_platform.proposal.Proposal;
import com.freelancer.freelancer_hiring_platform.proposal.ProposalService;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final ProposalService proposalService;
    private final ProjectService projectService;

    public ContractService(ContractRepository contractRepository,
                            UserRepository userRepository,
                            ProposalService proposalService,
                            ProjectService projectService) {
        this.contractRepository = contractRepository;
        this.userRepository = userRepository;
        this.proposalService = proposalService;
        this.projectService = projectService;
    }

    public Contract createContract(Long proposalId, String email) {

        User client = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Client not found"));

        if (!"CLIENT".equals(client.getRole())) {
            throw new RuntimeException(
                    "Only clients can create contracts"
            );
        }

        Proposal proposal = proposalService.getProposalById(proposalId)
                .orElseThrow(() ->
                        new RuntimeException("Proposal not found"));

        if (!"ACCEPTED".equals(proposal.getStatus())) {
            throw new RuntimeException(
                    "Only accepted proposals can become contracts"
            );
        }

        Project project = projectService
                .getProjectById(proposal.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        if (!client.getId().equals(project.getClientId())) {
            throw new RuntimeException(
                    "You can create contracts only for your own projects"
            );
        }

        Optional<Contract> existingContract =
                contractRepository.findByProposalId(proposalId);

        if (existingContract.isPresent()) {
            throw new RuntimeException(
                    "Contract already exists for this proposal"
            );
        }

        Contract contract = new Contract();

        contract.setProjectId(project.getId());
        contract.setProposalId(proposal.getId());
        contract.setClientId(project.getClientId());
        contract.setFreelancerId(proposal.getFreelancerId());
        contract.setAgreedAmount(proposal.getBidAmount());
        contract.setStartDate(LocalDate.now());
        contract.setExpectedEndDate(
                LocalDate.now().plusDays(proposal.getEstimatedDays())
        );
        contract.setStatus("ACTIVE");
        contract.setCreatedAt(LocalDateTime.now());

        project.setStatus("IN_PROGRESS");
        projectService.updateProject(project.getId(), project);

        return contractRepository.save(contract);
    }

    public List<Contract> getAllContracts() {

        return contractRepository.findAll();
    }

    public Optional<Contract> getContractById(Long id) {

        return contractRepository.findById(id);
    }

    public List<Contract> getContractsByClient(Long clientId) {

        return contractRepository.findByClientId(clientId);
    }

    public List<Contract> getContractsByFreelancer(Long freelancerId) {

        return contractRepository.findByFreelancerId(freelancerId);
    }

    public List<Contract> getContractsByStatus(String status) {

        return contractRepository.findByStatus(status);
    }

    public Contract updateStatus(Long id, String status, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contract not found"));

        boolean isClient =
                clientOwnsContract(user, contract);

        boolean isFreelancer =
                freelancerOwnsContract(user, contract);

        if (!isClient && !isFreelancer) {
            throw new RuntimeException(
                    "You are not authorized to update this contract"
            );
        }

        contract.setStatus(status);

        if ("COMPLETED".equals(status)) {

            Project project = projectService
                    .getProjectById(contract.getProjectId())
                    .orElseThrow(() ->
                            new RuntimeException("Project not found"));

            project.setStatus("COMPLETED");
            projectService.updateProject(project.getId(), project);
        }

        return contractRepository.save(contract);
    }

    private boolean clientOwnsContract(User user, Contract contract) {

        return "CLIENT".equals(user.getRole())
                && user.getId().equals(contract.getClientId());
    }

    private boolean freelancerOwnsContract(User user, Contract contract) {

        return "FREELANCER".equals(user.getRole())
                && user.getId().equals(contract.getFreelancerId());
    }
}