package com.freelancer.freelancer_hiring_platform.admin;

import com.freelancer.freelancer_hiring_platform.contract.Contract;
import com.freelancer.freelancer_hiring_platform.contract.ContractService;
import com.freelancer.freelancer_hiring_platform.dto.UserResponse;
import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.project.Project;
import com.freelancer.freelancer_hiring_platform.project.ProjectService;
import com.freelancer.freelancer_hiring_platform.proposal.Proposal;
import com.freelancer.freelancer_hiring_platform.proposal.ProposalService;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import com.freelancer.freelancer_hiring_platform.review.Review;
import com.freelancer.freelancer_hiring_platform.review.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final ProjectService projectService;
    private final ProposalService proposalService;
    private final ContractService contractService;
    private final ReviewService reviewService;

    public AdminService(UserRepository userRepository,
                        ProjectService projectService,
                        ProposalService proposalService,
                        ContractService contractService,
                        ReviewService reviewService) {

        this.userRepository = userRepository;
        this.projectService = projectService;
        this.proposalService = proposalService;
        this.contractService = contractService;
        this.reviewService = reviewService;
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::toUserResponse)
                .toList();
    }

    public List<Project> getAllProjects() {

        return projectService.getAllProjects();
    }

    public List<Proposal> getAllProposals() {

        return proposalService.getAllProposals();
    }

    public List<Contract> getAllContracts() {

        return contractService.getAllContracts();
    }

    public List<Review> getAllReviews() {

        return reviewService.getAllReviews();
    }

    private UserResponse toUserResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}