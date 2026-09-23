package com.freelancer.freelancer_hiring_platform.review;

import com.freelancer.freelancer_hiring_platform.contract.Contract;
import com.freelancer.freelancer_hiring_platform.contract.ContractService;
import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ContractService contractService;

    public ReviewService(ReviewRepository reviewRepository,
                         UserRepository userRepository,
                         ContractService contractService) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.contractService = contractService;
    }

    public Review createReview(Review review, String email) {

        User reviewer = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Contract contract = contractService
                .getContractById(review.getContractId())
                .orElseThrow(() ->
                        new RuntimeException("Contract not found"));

        if (!"COMPLETED".equals(contract.getStatus())) {
            throw new RuntimeException(
                    "Reviews can only be submitted after contract completion"
            );
        }

        boolean reviewerIsClient =
                "CLIENT".equals(reviewer.getRole())
                        && reviewer.getId().equals(contract.getClientId());

        boolean reviewerIsFreelancer =
                "FREELANCER".equals(reviewer.getRole())
                        && reviewer.getId().equals(contract.getFreelancerId());

        if (!reviewerIsClient && !reviewerIsFreelancer) {
            throw new RuntimeException(
                    "You are not authorized to review this contract"
            );
        }

        Long reviewedUserId;

        if (reviewerIsClient) {
            reviewedUserId = contract.getFreelancerId();
        } else {
            reviewedUserId = contract.getClientId();
        }

        if (review.getRating() == null
                || review.getRating() < 1
                || review.getRating() > 5) {

            throw new RuntimeException(
                    "Rating must be between 1 and 5"
            );
        }

        List<Review> existingReviews =
                reviewRepository.findByContractId(contract.getId());

        boolean alreadyReviewed = existingReviews.stream()
                .anyMatch(existing ->
                        reviewer.getId().equals(existing.getReviewerId())
                );

        if (alreadyReviewed) {
            throw new RuntimeException(
                    "You have already reviewed this contract"
            );
        }

        review.setProjectId(contract.getProjectId());
        review.setReviewerId(reviewer.getId());
        review.setReviewedUserId(reviewedUserId);
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {

        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Long id) {

        return reviewRepository.findById(id);
    }

    public List<Review> getReviewsByUser(Long userId) {

        return reviewRepository.findByReviewedUserId(userId);
    }

    public List<Review> getReviewsByReviewer(Long userId) {

        return reviewRepository.findByReviewerId(userId);
    }

    public List<Review> getReviewsByContract(Long contractId) {

        return reviewRepository.findByContractId(contractId);
    }

    public List<Review> getReviewsByProject(Long projectId) {

        return reviewRepository.findByProjectId(projectId);
    }
}