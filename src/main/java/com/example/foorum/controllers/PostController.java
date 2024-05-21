package com.example.foorum.controllers;

import com.example.foorum.dto.request.PostRequest;
import com.example.foorum.dto.response.PostResponse;
import com.example.foorum.service.post.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/community/{id}")
    public List<PostResponse> getAllPostsInCommunity(@PathVariable Long id) {
        return postService.getAllPostsInCommunity(id);
    }

    @PostMapping
    public PostResponse createPost(@Valid @RequestBody PostRequest postRequest) {
        return postService.createPost(postRequest);
    }

    @GetMapping("/user/")
    public List<PostResponse> getAllPostsByUser() {
        return postService.getAllPostsByUser();
    }
}