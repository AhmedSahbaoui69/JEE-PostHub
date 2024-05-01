package com.example.foorum.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record SignInRequestDto(
        @NotBlank(message = "Email cannot be empty.")
        String email,
        @NotBlank(message = "Password cannot be empty.")
        String password
) {}