package com.example.foorum.service.post.impl;

import com.example.foorum.dto.request.PostRequest;
import com.example.foorum.dto.response.PostResponse;
import com.example.foorum.dto.response.UserDtoResponse;
import com.example.foorum.exceptions.SpringFoorumException;
import com.example.foorum.model.Community;
import com.example.foorum.model.Post;
import com.example.foorum.model.User;
import com.example.foorum.repository.CommunityFollowRepository;
import com.example.foorum.repository.CommunityRepository;
import com.example.foorum.repository.PostRepository;
import com.example.foorum.service.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private CommunityFollowRepository communityFollowRepository;

    @Override
    public PostResponse createPost(PostRequest postRequest) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        Community community = communityRepository.findByName(postRequest.communityName())
                .orElseThrow(() -> new SpringFoorumException("Community not found"));

        if (!communityFollowRepository.existsByUserIdAndCommunityId(currentUser.getId(), community.getId())) {
            throw new SpringFoorumException("You must first follow the community to create a post in it");
        }

        Post post = new Post();
        post.setPostTitle(postRequest.postTitle());
        post.setDescription(postRequest.description());
        post.setCreator(currentUser);
        post.setCommunity(community);
        post.setCreatedDate(Instant.now());
        post = postRepository.save(post);
        return new PostResponse(
                post.getPostId(),
                post.getPostTitle(),
                post.getDescription(),
                new UserDtoResponse(
                        post.getCreator().getFirstName(),
                        post.getCreator().getLastName(),
                        post.getCreator().getEmail(),
                        post.getCreator().getImage()
                ),
                post.getCommunity().getName(),
                post.getVoteCount(),
                post.getCreatedDate()
        );
    }

    @Override
    public List<PostResponse> getAllPostsInCommunity(Long communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        return postRepository.findAllByCommunity(community).stream()
                .map(post -> new PostResponse(
                        post.getPostId(),
                        post.getPostTitle(),
                        post.getDescription(),
                        new UserDtoResponse(
                                post.getCreator().getFirstName(),
                                post.getCreator().getLastName(),
                                post.getCreator().getEmail(),
                                post.getCreator().getImage()
                        ),
                        post.getCommunity().getName(),
                        post.getVoteCount(),
                        post.getCreatedDate()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponse> getAllPostsByUser() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        return postRepository.findByCreator(currentUser).stream()
                .map(post -> new PostResponse(
                        post.getPostId(),
                        post.getPostTitle(),
                        post.getDescription(),
                        new UserDtoResponse(
                                post.getCreator().getFirstName(),
                                post.getCreator().getLastName(),
                                post.getCreator().getEmail(),
                                post.getCreator().getImage()
                        ),
                        post.getCommunity().getName(),
                        post.getVoteCount(),
                        post.getCreatedDate()
                ))
                .collect(Collectors.toList());
    }
}