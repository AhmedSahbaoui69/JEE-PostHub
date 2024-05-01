package com.example.foorum.dto.request;

public record UpdateUserDetailsRequestDto(
        String firstName,
        String lastName,
        String currentPassword,
        String newPassword,
        String profilePicture
) {}