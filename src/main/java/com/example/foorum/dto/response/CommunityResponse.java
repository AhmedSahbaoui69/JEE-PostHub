package com.example.foorum.dto.response;

import java.time.Instant;

public record CommunityResponse(
        Long id,
        String name,
        String description,
        int followerCount,
        int postCount,
        Instant createdDate,
        String  image,
        String creator
) {}