package com.freelancer.freelancer_hiring_platform.review;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByReviewedUserId(Long reviewedUserId);

    List<Review> findByReviewerId(Long reviewerId);

    List<Review> findByContractId(Long contractId);

    List<Review> findByProjectId(Long projectId);
}