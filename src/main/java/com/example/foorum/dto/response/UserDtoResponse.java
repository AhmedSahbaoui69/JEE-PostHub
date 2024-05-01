package com.example.foorum.dto.response;

import lombok.Builder;

@Builder
public record UserDtoResponse(
        String  firstName,
        String  lastName,
        String  email,
        String  image
) {}