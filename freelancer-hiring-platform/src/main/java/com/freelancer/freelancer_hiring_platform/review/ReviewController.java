package com.freelancer.freelancer_hiring_platform.review;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Review> createReview(
            @RequestBody Review review,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                reviewService.createReview(review, email)
        );
    }

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {

        return ResponseEntity.ok(
                reviewService.getAllReviews()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(
            @PathVariable Long id) {

        return reviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByUser(userId)
        );
    }

    @GetMapping("/reviewer/{userId}")
    public ResponseEntity<List<Review>> getReviewsByReviewer(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByReviewer(userId)
        );
    }

    @GetMapping("/contract/{contractId}")
    public ResponseEntity<List<Review>> getReviewsByContract(
            @PathVariable Long contractId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByContract(contractId)
        );
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Review>> getReviewsByProject(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                reviewService.getReviewsByProject(projectId)
        );
    }
}