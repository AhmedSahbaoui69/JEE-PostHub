package com.example.foorum.service.user;

import com.example.foorum.dto.request.UpdateUserDetailsRequestDto;
import com.example.foorum.dto.response.UserDtoResponse;

public interface UserService {

    UserDtoResponse getAuthenticatedUser();

    UserDtoResponse updateUser(UpdateUserDetailsRequestDto dto);

    void delete();
}
