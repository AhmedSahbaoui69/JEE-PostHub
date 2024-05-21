package com.example.foorum.service.post;

import com.example.foorum.dto.request.PostRequest;
import com.example.foorum.dto.response.PostResponse;

import java.util.List;

public interface PostService {
    List<PostResponse> getAllPostsInCommunity(Long communityId);
    PostResponse createPost(PostRequest postRequest);
    List<PostResponse> getAllPostsByUser();
}