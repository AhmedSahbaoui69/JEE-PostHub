package com.example.foorum.controllers;

import com.example.foorum.dto.request.PostRequest;
import com.example.foorum.dto.request.VoteRequest;
import com.example.foorum.dto.response.PostResponse;
import com.example.foorum.service.post.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.example.foorum.service.vote.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final VoteService voteService;

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

    @PostMapping("/upvote")
    public ResponseEntity<Void> upvotePost(@Valid @RequestBody VoteRequest voteRequest) {
        voteService.upvotePost(voteRequest.postId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/downvote")
    public ResponseEntity<Void> downvotePost(@Valid @RequestBody VoteRequest voteRequest) {
        voteService.downvotePost(voteRequest.postId());
        return ResponseEntity.ok().build();
    }
}