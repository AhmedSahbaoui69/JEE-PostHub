package com.example.foorum.dto.response;

import java.time.Instant;

public record PostResponse(
        Long id,
        String postTitle,
        String description,
        UserDtoResponse user,
        String communityName,
        Integer voteCount,
        Instant createdDate
) {}