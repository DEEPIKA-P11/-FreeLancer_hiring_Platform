package com.freelancer.freelancer_hiring_platform.service;

import com.freelancer.freelancer_hiring_platform.dto.AuthResponse;
import com.freelancer.freelancer_hiring_platform.dto.LoginRequest;
import com.freelancer.freelancer_hiring_platform.dto.OtpVerificationRequest;
import com.freelancer.freelancer_hiring_platform.dto.RegisterRequest;
import com.freelancer.freelancer_hiring_platform.entity.PendingRegistration;
import com.freelancer.freelancer_hiring_platform.entity.User;
import com.freelancer.freelancer_hiring_platform.repository.PendingRegistrationRepository;
import com.freelancer.freelancer_hiring_platform.repository.UserRepository;
import com.freelancer.freelancer_hiring_platform.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PendingRegistrationRepository pendingRegistrationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    public AuthService(
            UserRepository userRepository,
            PendingRegistrationRepository pendingRegistrationRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.pendingRegistrationRepository = pendingRegistrationRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    // =========================
    // REGISTER
    // =========================
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        String role = request.getRole()
                .trim()
                .toUpperCase();

        // Only CLIENT and FREELANCER can register publicly
        if (!role.equals("CLIENT") && !role.equals("FREELANCER")) {
            throw new RuntimeException(
                    "Only CLIENT or FREELANCER can register"
            );
        }

        // Check if user already exists
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // If an old pending registration exists,
        // remove it so a fresh OTP can be generated.
        pendingRegistrationRepository.findByEmail(email)
                .ifPresent(pendingRegistrationRepository::delete);

        // Generate 6-digit OTP
        String otp = generateOtp();

        // Save registration temporarily
        PendingRegistration pending = new PendingRegistration();

        pending.setName(request.getName().trim());
        pending.setEmail(email);

        // Store encoded password, not plain password
        pending.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        pending.setRole(role);
        pending.setOtp(otp);

        // OTP valid for 5 minutes
        pending.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );

        pendingRegistrationRepository.save(pending);

        // Send OTP email
        emailService.sendOtpEmail(email, otp);

        return new AuthResponse(
                null,
                "OTP sent to your email",
                null,
                pending.getName(),
                pending.getEmail(),
                pending.getRole()
        );
    }

    // =========================
    // VERIFY OTP
    // =========================
    public AuthResponse verifyOtp(OtpVerificationRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        String otp = request.getOtp()
                .trim();

        PendingRegistration pending =
                pendingRegistrationRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No pending registration found"
                                )
                        );

        // Check OTP expiry
        if (LocalDateTime.now()
                .isAfter(pending.getOtpExpiry())) {

            pendingRegistrationRepository.delete(pending);

            throw new RuntimeException(
                    "OTP expired. Please register again."
            );
        }

        // Check OTP
        if (!pending.getOtp().equals(otp)) {
            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        // Create actual user only after OTP verification
        User user = new User();

        user.setName(pending.getName());
        user.setEmail(pending.getEmail());
        user.setPassword(pending.getPassword());
        user.setRole(pending.getRole());

        User savedUser = userRepository.save(user);

        // Delete temporary registration
        pendingRegistrationRepository.delete(pending);

        // Send success email
        emailService.sendRegistrationSuccessEmail(
                savedUser.getEmail(),
                savedUser.getName()
        );

        return new AuthResponse(
                null,
                "Registration successful",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    // =========================
    // LOGIN
    // =========================
    public AuthResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid email or password"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return new AuthResponse(
                token,
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    // =========================
    // GENERATE OTP
    // =========================
    private String generateOtp() {

        int otpNumber =
                100000 + secureRandom.nextInt(900000);

        return String.valueOf(otpNumber);
    }
}