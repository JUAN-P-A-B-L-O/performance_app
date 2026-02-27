package com.juan.performanceApp.security;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenService implements TokenService{
    @Override
    public boolean isValid(String token) {
        return false;
    }

    @Override
    public String generateAccessToken(String userId) {
        return "";
    }

    @Override
    public String generateRefreshToken(String userId) {
        return "";
    }

    @Override
    public String extractUserId(String token) {
        return "";
    }

}
