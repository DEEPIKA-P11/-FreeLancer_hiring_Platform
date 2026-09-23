package com.freelancer.freelancer_hiring_platform.proposal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    List<Proposal> findByProjectId(Long projectId);

    List<Proposal> findByFreelancerId(Long freelancerId);

    List<Proposal> findByStatus(String status);

}