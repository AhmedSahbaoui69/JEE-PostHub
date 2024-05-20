package com.example.foorum.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommunityRequest(
        @NotBlank(message = "Community name is required") String name,
        @NotBlank(message = "Description is required") String description,
        @NotBlank(message = "Image is required") String communityPicture
) {}