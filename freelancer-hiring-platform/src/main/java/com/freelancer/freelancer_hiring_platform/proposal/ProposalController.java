package com.freelancer.freelancer_hiring_platform.proposal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    private final ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @PostMapping
    public ResponseEntity<Proposal> createProposal(
            @RequestBody Proposal proposal,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                proposalService.createProposal(proposal, email)
        );
    }

    @GetMapping
    public ResponseEntity<List<Proposal>> getAllProposals() {

        return ResponseEntity.ok(
                proposalService.getAllProposals()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proposal> getProposalById(
            @PathVariable Long id) {

        return proposalService.getProposalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Proposal>> getProposalsByProject(
            @PathVariable Long projectId) {

        return ResponseEntity.ok(
                proposalService.getProposalsByProject(projectId)
        );
    }

    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<Proposal>> getProposalsByFreelancer(
            @PathVariable Long freelancerId) {

        return ResponseEntity.ok(
                proposalService.getProposalsByFreelancer(freelancerId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Proposal>> getProposalsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                proposalService.getProposalsByStatus(status)
        );
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<Proposal> acceptProposal(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                proposalService.acceptProposal(id, email)
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Proposal> rejectProposal(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                proposalService.rejectProposal(id, email)
        );
    }
}