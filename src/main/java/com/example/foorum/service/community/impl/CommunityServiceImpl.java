package com.example.foorum.service.community.impl;

import com.example.foorum.dto.request.CommunityRequest;
import com.example.foorum.dto.response.CommunityResponse;
import com.example.foorum.exceptions.SpringFoorumException;
import com.example.foorum.model.Community;
import com.example.foorum.model.CommunityFollow;
import com.example.foorum.model.User;
import com.example.foorum.repository.CommunityFollowRepository;
import com.example.foorum.repository.CommunityRepository;
import com.example.foorum.repository.PostRepository;
import com.example.foorum.service.community.CommunityService;
import lombok.RequiredArgsConstructor;
import org.hibernate.NonUniqueResultException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityFollowRepository communityFollowRepository;
    private final PostRepository postRepository;

    @Override
    public CommunityResponse createCommunity(CommunityRequest communityRequest) {
        try {
            communityRepository.findByName(communityRequest.name().toLowerCase())
                    .ifPresent(community -> {
                        throw new SpringFoorumException("A community with the same name already exists");
                    });
            Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) userAuth.getPrincipal();
            Community community = Community.builder()
                    .name(communityRequest.name())
                    .description(communityRequest.description())
                    .createdDate(Instant.now())
                    .creator(currentUser)
                    .followers(new HashSet<>())
                    .posts(new HashSet<>())
                    .image(communityRequest.communityPicture())
                    .build();
            community = communityRepository.save(community);
            return new CommunityResponse(
                    community.getId(),
                    community.getName(),
                    community.getDescription(),
                    community.getFollowers().size(),
                    community.getPosts().size(),
                    community.getCreatedDate(),
                    community.getImage(),
                    community.getCreator().getEmail()
            );
        } catch (NonUniqueResultException ex) {
            throw new SpringFoorumException("A community with the same name already exists");
        }
    }

    @Override
    public CommunityResponse updateCommunity(Long id, CommunityRequest communityRequest) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        community.setName(communityRequest.name());
        community.setDescription(communityRequest.description());
        community = communityRepository.save(community);
        return new CommunityResponse(
                community.getId(),
                community.getName(),
                community.getDescription(),
                community.getFollowers().size(),
                community.getPosts().size(),
                community.getCreatedDate(),
                community.getImage(),
                community.getCreator().getEmail()
        );
    }

    @Override
    public CommunityResponse getCommunityById(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        return new CommunityResponse(
                community.getId(),
                community.getName(),
                community.getDescription(),
                communityFollowRepository.findAllFollowersByCommunityId(community.getId()).size(),
                community.getPosts().size(),
                community.getCreatedDate(),
                community.getImage(),
                community.getCreator().getEmail()
        );
    }

    @Transactional
    @Override
    public ResponseEntity<Void> deleteCommunity(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));

        communityFollowRepository.deleteByCommunityId(id);
        postRepository.deleteByCommunityId(id);

        communityRepository.delete(community);
        return ResponseEntity.ok().build();
    }

    @Override
    public boolean isCommunityFollowed(Long communityId) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        return communityFollowRepository.existsByUserIdAndCommunityId(currentUser.getId(), communityId);
    }

    @Transactional
    @Override
    public boolean toggleFollow(Long communityId) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        boolean isFollowing = communityFollowRepository.existsByUserIdAndCommunityId(currentUser.getId(), communityId);
        if (isFollowing) {
            communityFollowRepository.deleteByUserIdAndCommunityId(currentUser.getId(), communityId);
        } else {
            CommunityFollow follow = new CommunityFollow();
            follow.setUser(currentUser);
            follow.setCommunity(community);
            follow.setFollowedAt(Instant.now());
            communityFollowRepository.save(follow);
        }
        return !isFollowing;
    }

    @Override
    public List<CommunityResponse> getUserFollowedCommunities() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        return communityFollowRepository.findAllFollowedCommunitiesByUserId(currentUser.getId()).stream()
                .map(community -> new CommunityResponse(
                        community.getId(),
                        community.getName(),
                        community.getDescription(),
                        communityFollowRepository.findAllFollowersByCommunityId(community.getId()).size(),
                        community.getPosts().size(),
                        community.getCreatedDate(),
                        community.getImage(),
                        community.getCreator().getEmail()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<CommunityResponse> getAllCreatedByUserCommunities() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) userAuth.getPrincipal();
        return communityRepository.findAllByCreatorId(currentUser.getId()).stream()
                .map(community -> new CommunityResponse(
                        community.getId(),
                        community.getName(),
                        community.getDescription(),
                        communityFollowRepository.findAllFollowersByCommunityId(community.getId()).size(),
                        community.getPosts().size(),
                        community.getCreatedDate(),
                        community.getImage(),
                        community.getCreator().getEmail()
                ))
                .collect(Collectors.toList());
    }
}
