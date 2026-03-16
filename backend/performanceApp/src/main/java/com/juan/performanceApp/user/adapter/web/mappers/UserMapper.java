package com.juan.performanceApp.user.adapter.web.mappers;

import com.juan.performanceApp.user.adapter.web.dto.UserDto;
import com.juan.performanceApp.user.adapter.web.dto.UserDtoResponse;
import com.juan.performanceApp.user.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toDomain(UserDto userDto){
        return User.newUser(
                userDto.name(),
                userDto.email(),
                userDto.password()
        );
    }

    public UserDtoResponse toResponse(User user){
        if(user ==null) return null;

        return new UserDtoResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
}
