package com.juan.performanceApp.auth.infrastructure.token;

import com.juan.performanceApp.auth.application.service.auth.AuthenticatedUser;
import com.juan.performanceApp.auth.application.service.token.TokenService;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenService implements TokenService {
    @Override
    public String generateAccessToken(AuthenticatedUser authenticatedUser) {
        return "teste";
    }

    @Override
    public String generateRefreshToken(AuthenticatedUser authenticatedUser) {
        return "teste";
    }

    @Override
    public Boolean valitadeToken(String token) {
        return null;
    }

    @Override
    public AuthenticatedUser parse(String token) {
        return null;
    }
}
