package com.example.foorum.service.vote;

public interface VoteService {
    void upvotePost(Long postId);
    void downvotePost(Long postId);
}