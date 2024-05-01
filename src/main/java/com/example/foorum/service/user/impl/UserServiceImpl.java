package com.example.foorum.service.user.impl;

import com.example.foorum.dto.request.UpdateUserDetailsRequestDto;
import com.example.foorum.dto.response.UserDtoResponse;
import com.example.foorum.exceptions.SpringFoorumException;
import com.example.foorum.model.User;
import com.example.foorum.repository.UserRepository;
import com.example.foorum.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDtoResponse getAuthenticatedUser() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) userAuth.getPrincipal();

        return UserDtoResponse.builder()
                .firstName(currentUser.getFirstName())
                .lastName(currentUser.getLastName())
                .email(currentUser.getEmail())
                .image(currentUser.getImage())
                .build();
    }

    @Override
    @Transactional
    public UserDtoResponse updateUser(UpdateUserDetailsRequestDto dto) {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) userAuth.getPrincipal();

        if (dto.currentPassword() != null && !dto.currentPassword().isEmpty() && !passwordEncoder.matches(dto.currentPassword(), currentUser.getPassword())) {
            throw new SpringFoorumException("Current password is incorrect.");
        }

        setFields(dto, currentUser);

        User updatedUser = userRepository.save(currentUser);

        return UserDtoResponse.builder()
                .firstName(updatedUser.getFirstName())
                .lastName(updatedUser.getLastName())
                .email(updatedUser.getEmail())
                .image(updatedUser.getImage())
                .build();
    }

    private void setFields(UpdateUserDetailsRequestDto dto, User currentUser) {
        if (dto.firstName() != null && !dto.firstName().isEmpty()) {
            currentUser.setFirstName(dto.firstName());
        }
        if (dto.lastName() != null && !dto.lastName().isEmpty()) {
            currentUser.setLastName(dto.lastName());
        }
        if (dto.newPassword() != null && !dto.newPassword().isEmpty()) {
            currentUser.setPassword(passwordEncoder.encode(dto.newPassword()));
        }
        if (dto.profilePicture() != null && !dto.profilePicture().isEmpty()) {
            currentUser.setImage(dto.profilePicture());
        }
        currentUser.setRole(currentUser.getRole());
    }

    @Override
    @Transactional
    public void delete() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) userAuth.getPrincipal();

        userRepository.delete(currentUser);
    }
}
