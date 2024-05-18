package com.example.foorum.service.auth.impl;

import com.example.foorum.dto.request.SignInRequestDto;
import com.example.foorum.dto.request.SignUpRequestDto;
import com.example.foorum.dto.response.JwtAuthenticationResponse;
import com.example.foorum.exceptions.SpringFoorumException;
import com.example.foorum.model.Role;
import com.example.foorum.model.User;
import com.example.foorum.repository.UserRepository;
import com.example.foorum.service.auth.AuthenticationService;
import com.example.foorum.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public JwtAuthenticationResponse register(SignUpRequestDto request) {
        var user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role() == null ? Role.USER : request.role())
                .build();

        userRepository.save(user);
        var jwt = jwtService.generateToken(user);

        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public JwtAuthenticationResponse login(SignInRequestDto request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (BadCredentialsException e) {
            throw new SpringFoorumException("Invalid email or password");
        }
        var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new SpringFoorumException("Invalid email or password"));

        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder()
                .token(jwt)
                .build();
    }
}