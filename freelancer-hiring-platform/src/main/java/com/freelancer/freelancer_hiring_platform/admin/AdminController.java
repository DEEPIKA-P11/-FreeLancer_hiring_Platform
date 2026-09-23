package com.freelancer.freelancer_hiring_platform.admin;

import com.freelancer.freelancer_hiring_platform.contract.Contract;
import com.freelancer.freelancer_hiring_platform.dto.UserResponse;
import com.freelancer.freelancer_hiring_platform.project.Project;
import com.freelancer.freelancer_hiring_platform.proposal.Proposal;
import com.freelancer.freelancer_hiring_platform.review.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(adminService.getAllProjects());
    }

    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getAllProposals() {
        return ResponseEntity.ok(adminService.getAllProposals());
    }

    @GetMapping("/contracts")
    public ResponseEntity<List<Contract>> getAllContracts() {
        return ResponseEntity.ok(adminService.getAllContracts());
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(adminService.getAllReviews());
    }
}