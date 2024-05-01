package com.example.foorum.dto.request;

import com.example.foorum.model.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record SignUpRequestDto(
        @NotBlank(message = "First name cannot be empty.")
        String firstName,
        @NotBlank(message = "Last name cannot be empty.")
        String lastName,
        @NotBlank(message = "Email cannot be empty.")
        String email,
        @NotBlank(message = "Password cannot be empty.")
        String password,
        Role role
) {}