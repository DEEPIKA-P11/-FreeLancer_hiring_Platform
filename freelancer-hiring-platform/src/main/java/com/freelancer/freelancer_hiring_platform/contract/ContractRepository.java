package com.freelancer.freelancer_hiring_platform.contract;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    Optional<Contract> findByProposalId(Long proposalId);

    List<Contract> findByClientId(Long clientId);

    List<Contract> findByFreelancerId(Long freelancerId);

    List<Contract> findByStatus(String status);
}