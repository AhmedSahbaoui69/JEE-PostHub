package com.example.foorum.service.community.impl;

import com.example.foorum.dto.request.CommunityRequest;
import com.example.foorum.dto.response.CommunityResponse;
import com.example.foorum.exceptions.SpringFoorumException;
import com.example.foorum.model.Community;
import com.example.foorum.model.User;
import com.example.foorum.repository.CommunityRepository;
import com.example.foorum.service.community.CommunityService;
import lombok.RequiredArgsConstructor;
import org.hibernate.NonUniqueResultException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;

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
                    .user(currentUser)
                    .build();
            community = communityRepository.save(community);
            return new CommunityResponse(
                    community.getId(),
                    community.getName(),
                    community.getDescription()
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
                community.getDescription()
        );
    }

    @Override
    public CommunityResponse getCommunityById(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        return new CommunityResponse(
                community.getId(),
                community.getName(),
                community.getDescription()
        );
    }

    @Override
    public void deleteCommunity(Long id) {
        Community community = communityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community not found"));
        communityRepository.delete(community);
    }

    @Override
    public List<CommunityResponse> getAllCommunities() {
        return communityRepository.findAll().stream()
                .map(community -> new CommunityResponse(
                        community.getId(),
                        community.getName(),
                        community.getDescription()
                ))
                .collect(Collectors.toList());
    }
}