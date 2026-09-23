package com.freelancer.freelancer_hiring_platform.proposal;

import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.project.Project;
import com.freelancer.freelancer_hiring_platform.project.ProjectService;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public ProposalService(ProposalRepository proposalRepository,
                           UserRepository userRepository,
                           ProjectService projectService) {
        this.proposalRepository = proposalRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
    }

    public Proposal createProposal(Proposal proposal, String email) {

        User freelancer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Freelancer not found"));

        if (!"FREELANCER".equals(freelancer.getRole())) {
            throw new RuntimeException(
                    "Only freelancers can submit proposals"
            );
        }

        Project project = projectService
                .getProjectById(proposal.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        if (freelancer.getId().equals(project.getClientId())) {
            throw new RuntimeException(
                    "You cannot submit a proposal to your own project"
            );
        }

        if (!"POSTED".equals(project.getStatus())) {
            throw new RuntimeException(
                    "Proposals can only be submitted to posted projects"
            );
        }

        List<Proposal> existingProposals =
                proposalRepository.findByProjectId(project.getId());

        boolean alreadySubmitted = existingProposals.stream()
                .anyMatch(existing ->
                        freelancer.getId().equals(
                                existing.getFreelancerId()
                        ));

        if (alreadySubmitted) {
            throw new RuntimeException(
                    "You have already submitted a proposal for this project"
            );
        }

        proposal.setFreelancerId(freelancer.getId());
        proposal.setStatus("PENDING");
        proposal.setSubmittedAt(LocalDateTime.now());

        return proposalRepository.save(proposal);
    }

    public List<Proposal> getAllProposals() {

        return proposalRepository.findAll();
    }

    public Optional<Proposal> getProposalById(Long id) {

        return proposalRepository.findById(id);
    }

    public List<Proposal> getProposalsByProject(Long projectId) {

        return proposalRepository.findByProjectId(projectId);
    }

    public List<Proposal> getProposalsByFreelancer(Long freelancerId) {

        return proposalRepository.findByFreelancerId(freelancerId);
    }

    public List<Proposal> getProposalsByStatus(String status) {

        return proposalRepository.findByStatus(status);
    }

    public Proposal acceptProposal(Long proposalId, String email) {

        User client = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Client not found"));

        if (!"CLIENT".equals(client.getRole())) {
            throw new RuntimeException(
                    "Only clients can accept proposals"
            );
        }

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() ->
                        new RuntimeException("Proposal not found"));

        Project project = projectService
                .getProjectById(proposal.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        if (!client.getId().equals(project.getClientId())) {
            throw new RuntimeException(
                    "You can accept proposals only for your own projects"
            );
        }

        if (!"PENDING".equals(proposal.getStatus())) {
            throw new RuntimeException(
                    "Only pending proposals can be accepted"
            );
        }

        proposal.setStatus("ACCEPTED");

        List<Proposal> projectProposals =
                proposalRepository.findByProjectId(project.getId());

        for (Proposal otherProposal : projectProposals) {

            if (!otherProposal.getId().equals(proposalId)
                    && "PENDING".equals(otherProposal.getStatus())) {

                otherProposal.setStatus("REJECTED");
                proposalRepository.save(otherProposal);
            }
        }

        project.setStatus("HIRED");
        projectService.updateProject(project.getId(), project);

        return proposalRepository.save(proposal);
    }

    public Proposal rejectProposal(Long proposalId, String email) {

        User client = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Client not found"));

        if (!"CLIENT".equals(client.getRole())) {
            throw new RuntimeException(
                    "Only clients can reject proposals"
            );
        }

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() ->
                        new RuntimeException("Proposal not found"));

        Project project = projectService
                .getProjectById(proposal.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        if (!client.getId().equals(project.getClientId())) {
            throw new RuntimeException(
                    "You can reject proposals only for your own projects"
            );
        }

        if (!"PENDING".equals(proposal.getStatus())) {
            throw new RuntimeException(
                    "Only pending proposals can be rejected"
            );
        }

        proposal.setStatus("REJECTED");

        return proposalRepository.save(proposal);
    }
}