package com.juan.performanceApp.user.adapter.web;

import com.juan.performanceApp.user.adapter.web.dto.UserDto;
import com.juan.performanceApp.user.adapter.web.dto.UserDtoResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/users")
public class UserController {

    public UserController(){

    }


    @PostMapping
    public ResponseEntity<UserDtoResponse> createUser(@Valid @RequestBody UserDto userDto){


        return null;
    }

}
