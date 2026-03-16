package com.juan.performanceApp.user.adapter.web;

import com.juan.performanceApp.user.adapter.web.dto.UserDto;
import com.juan.performanceApp.user.adapter.web.dto.UserDtoResponse;
import com.juan.performanceApp.user.adapter.web.mappers.UserMapper;
import com.juan.performanceApp.user.application.service.UserService;
import com.juan.performanceApp.user.domain.model.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/users")
public class UserController {
    final private UserService userService;
    final private UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper){
        this.userService = userService;
        this.userMapper = userMapper;
    }


    @PostMapping
    public ResponseEntity<UserDtoResponse> createUser( @Valid @RequestBody UserDto userDto){
        User user = userMapper.toDomain(userDto);

        User createdUser = this.userService.createUser(user);

        UserDtoResponse createdUserDto = userMapper.toResponse(createdUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdUserDto);
    }

}
