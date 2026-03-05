package com.juan.performanceApp.auth.application.service.auth;

public record LoginResult(
        String accessToken,
        long accessTokenExpiresInSeconds,
        String refreshToken,
        long refreshTokenExpiresInSeconds
) {}
