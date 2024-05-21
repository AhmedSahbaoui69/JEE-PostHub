package com.example.foorum.service.vote.impl;

import com.example.foorum.model.Post;
import com.example.foorum.model.User;
import com.example.foorum.model.Vote;
import com.example.foorum.model.VoteType;
import com.example.foorum.repository.PostRepository;
import com.example.foorum.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.foorum.service.vote.VoteService;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class VoteServiceImpl implements VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public void upvotePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<Vote> voteForPostByUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, currentUser);
        if (voteForPostByUser.isPresent() && voteForPostByUser.get().getVoteType().equals(VoteType.UPVOTE)) {
            voteRepository.delete(voteForPostByUser.get());
            post.setVoteCount(post.getVoteCount() - 1);
        } else {
            voteRepository.save(new Vote(VoteType.UPVOTE, post, currentUser));
            post.setVoteCount(post.getVoteCount() + 1);
        }

        postRepository.save(post);
    }

    @Transactional
    public void downvotePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<Vote> voteForPostByUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, currentUser);
        if (voteForPostByUser.isPresent() && voteForPostByUser.get().getVoteType().equals(VoteType.DOWNVOTE)) {
            voteRepository.delete(voteForPostByUser.get());
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            voteRepository.save(new Vote(VoteType.DOWNVOTE, post, currentUser));
            post.setVoteCount(post.getVoteCount() - 1);
        }

        postRepository.save(post);
    }
}