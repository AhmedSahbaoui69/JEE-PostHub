package com.example.foorum.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {
    private Long postId;
    private String communityName;
    @NotBlank(message = "Post title cannot be empty.")
    private String postTitle;
    private String url;
    private String description;
}