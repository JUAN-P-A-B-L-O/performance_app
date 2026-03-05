package com.juan.performanceApp.auth.adapter.web.controller;

import com.juan.performanceApp.auth.adapter.web.dto.LoginResponseDto;
import com.juan.performanceApp.auth.adapter.web.dto.UserLoginDto;
import com.juan.performanceApp.auth.application.service.auth.AuthService;
import com.juan.performanceApp.auth.application.service.auth.LoginResult;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    final private AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping()
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody UserLoginDto userLoginDto){

        LoginResult loginResult = authService.login(userLoginDto.email(), userLoginDto.password());

        LoginResponseDto loginResponseDto = new LoginResponseDto(
                loginResult.accessToken(),
                loginResult.accessTokenExpiresInSeconds(),
                loginResult.refreshToken(),
                loginResult.refreshTokenExpiresInSeconds()
        );

        return ResponseEntity.ok(loginResponseDto);
    }

}
