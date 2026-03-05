package com.juan.performanceApp.auth.application.service.auth;

import com.juan.performanceApp.auth.application.service.token.TokenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JwtAuthService implements AuthService {
    final public TokenService tokenService;

    public JwtAuthService(TokenService tokenService){
        this.tokenService = tokenService;
    }


    @Override
    public LoginResult login(String email, String password) {
        AuthenticatedUser authenticatedUser = new AuthenticatedUser(UUID.randomUUID(), List.of("teste"));

        LoginResult loginResult = new LoginResult(
                tokenService.generateAccessToken(authenticatedUser),
                1000,
                tokenService.generateRefreshToken(authenticatedUser),
                1231231
        );

        return loginResult;
    }
}
