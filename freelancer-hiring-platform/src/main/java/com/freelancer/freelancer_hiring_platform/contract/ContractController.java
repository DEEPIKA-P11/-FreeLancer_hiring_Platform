package com.freelancer.freelancer_hiring_platform.contract;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping("/proposal/{proposalId}")
    public ResponseEntity<Contract> createContract(
            @PathVariable Long proposalId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                contractService.createContract(proposalId, email)
        );
    }

    @GetMapping
    public ResponseEntity<List<Contract>> getAllContracts() {

        return ResponseEntity.ok(
                contractService.getAllContracts()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contract> getContractById(
            @PathVariable Long id) {

        return contractService.getContractById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Contract>> getContractsByClient(
            @PathVariable Long clientId) {

        return ResponseEntity.ok(
                contractService.getContractsByClient(clientId)
        );
    }

    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<Contract>> getContractsByFreelancer(
            @PathVariable Long freelancerId) {

        return ResponseEntity.ok(
                contractService.getContractsByFreelancer(freelancerId)
        );
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Contract>> getContractsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                contractService.getContractsByStatus(status)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Contract> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                contractService.updateStatus(id, status, email)
        );
    }
}