package com.freelancer.freelancer_hiring_platform.controller;

import com.freelancer.freelancer_hiring_platform.dto.AuthResponse;
import com.freelancer.freelancer_hiring_platform.dto.LoginRequest;
import com.freelancer.freelancer_hiring_platform.dto.OtpVerificationRequest;
import com.freelancer.freelancer_hiring_platform.dto.RegisterRequest;
import com.freelancer.freelancer_hiring_platform.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(
            @RequestBody OtpVerificationRequest request
    ) {
        return ResponseEntity.ok(
                authService.verifyOtp(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}