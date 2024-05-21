package com.example.foorum.service.community;

import com.example.foorum.dto.request.CommunityRequest;
import com.example.foorum.dto.response.CommunityResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommunityService {
    CommunityResponse createCommunity(CommunityRequest communityRequest);

    CommunityResponse updateCommunity(Long id, CommunityRequest communityRequest);

     ResponseEntity<Void> deleteCommunity(Long id) ;

    CommunityResponse getCommunityById(Long id);

    boolean isCommunityFollowed(Long communityId);

    boolean toggleFollow(Long communityId);

    List<CommunityResponse> getUserFollowedCommunities();

     List<CommunityResponse> getAllCreatedByUserCommunities();
    }