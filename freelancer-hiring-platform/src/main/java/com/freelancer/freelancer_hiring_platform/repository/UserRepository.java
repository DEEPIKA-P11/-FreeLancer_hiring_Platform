package com.freelancer.freelancer_hiring_platform.repository;

import com.freelancer.freelancer_hiring_platform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}