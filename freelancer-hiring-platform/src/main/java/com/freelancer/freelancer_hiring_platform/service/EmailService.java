package com.freelancer.freelancer_hiring_platform.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Freelancer Hiring Platform - OTP Verification");

        message.setText(
                "Your OTP for Freelancer Hiring Platform registration is: "
                        + otp
                        + "\n\n"
                        + "This OTP is valid for 5 minutes."
        );

        mailSender.send(message);
    }

    public void sendRegistrationSuccessEmail(
            String email,
            String name) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject(
                "Freelancer Hiring Platform - Registration Successful"
        );

        message.setText(
                "Hello " + name + ",\n\n"
                        + "Your registration was completed successfully.\n\n"
                        + "You can now login to the Freelancer Hiring Platform.\n\n"
                        + "Thank you."
        );

        mailSender.send(message);
    }
}