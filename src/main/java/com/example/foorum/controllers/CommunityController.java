package com.example.foorum.controllers;

import com.example.foorum.dto.request.CommunityRequest;
import com.example.foorum.dto.response.CommunityResponse;
import com.example.foorum.service.community.CommunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;

    @PostMapping
    public ResponseEntity<CommunityResponse> createCommunity(@Valid @RequestBody CommunityRequest communityRequest) {
        var community = communityService.createCommunity(communityRequest);
        return ResponseEntity.ok(community);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommunityResponse> updateCommunity(@PathVariable Long id, @RequestBody CommunityRequest communityRequest) {
        var community = communityService.updateCommunity(id, communityRequest);
        return ResponseEntity.ok(community);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CommunityResponse>> getAllCommunities() {
        var communities = communityService.getAllCommunities();
        return ResponseEntity.ok(communities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityResponse> getCommunityById(@PathVariable Long id) {
        var community = communityService.getCommunityById(id);
        return ResponseEntity.ok(community);
    }
}