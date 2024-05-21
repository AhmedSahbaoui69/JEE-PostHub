package com.example.foorum.dto.request;

import jakarta.validation.constraints.NotBlank;

public record PostRequest(
        @NotBlank(message = "Community name cannot be empty.") String communityName,
        @NotBlank(message = "Post title cannot be empty.") String postTitle,
        String description
) {}