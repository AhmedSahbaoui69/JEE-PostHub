package com.example.foorum.dto.response;

import lombok.Builder;

@Builder
public record JwtAuthenticationResponse(String token) {}
