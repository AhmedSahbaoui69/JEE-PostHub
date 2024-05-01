package com.example.foorum.controllers;

import com.example.foorum.dto.request.SignInRequestDto;
import com.example.foorum.dto.request.SignUpRequestDto;
import com.example.foorum.dto.response.JwtAuthenticationResponse;
import com.example.foorum.service.auth.AuthenticationService;
import com.example.foorum.service.jwt.impl.JwtServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final JwtServiceImpl jwtService;

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> register(@Valid @RequestBody SignUpRequestDto requestDto) {
        return ResponseEntity.ok(authenticationService.register(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@Valid @RequestBody SignInRequestDto requestDto) {
        return ResponseEntity.ok(authenticationService.login(requestDto));
    }
}