package com.juan.performanceApp.login.adapter.web.controller;

import com.juan.performanceApp.login.adapter.web.dto.LoginResponseDto;
import com.juan.performanceApp.login.adapter.web.dto.UserLoginDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody UserLoginDto userLoginDto){

        return null;
    }

}
