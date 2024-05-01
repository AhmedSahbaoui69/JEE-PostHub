package com.example.foorum.service.auth;

import  com.example.foorum.dto.request.SignInRequestDto;
import com.example.foorum.dto.request.SignUpRequestDto;
import com.example.foorum.dto.response.JwtAuthenticationResponse;

public interface AuthenticationService {

    JwtAuthenticationResponse register(SignUpRequestDto request);

    JwtAuthenticationResponse login(SignInRequestDto request);

}
