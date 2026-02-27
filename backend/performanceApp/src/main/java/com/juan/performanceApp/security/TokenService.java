package com.juan.performanceApp.security;

public interface TokenService {
    boolean isValid(String token);

    String generateAccessToken(String userId);
    String generateRefreshToken(String userId);
    String extractUserId(String token);
}