package com.example.foorum.dto.request;

import com.example.foorum.model.VoteType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public record VoteRequest(VoteType voteType, Long postId) {}