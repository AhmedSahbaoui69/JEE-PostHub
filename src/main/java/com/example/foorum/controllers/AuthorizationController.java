package com.example.foorum.controllers;

import com.example.foorum.dto.request.UpdateUserDetailsRequestDto;
import com.example.foorum.dto.response.UserDtoResponse;
import com.example.foorum.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/resource")
public class AuthorizationController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDtoResponse> authenticatedUser() {
        var user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/me")
    public ResponseEntity<UserDtoResponse> updatedUserAuth(@RequestBody UpdateUserDetailsRequestDto dto) {
        var user = userService.updateUser(dto);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> delete() {
        userService.delete();
        return ResponseEntity.noContent().build();
    }
}
