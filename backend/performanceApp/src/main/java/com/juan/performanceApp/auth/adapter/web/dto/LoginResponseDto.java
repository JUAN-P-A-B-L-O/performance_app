package com.juan.performanceApp.auth.adapter.web.dto;

public record LoginResponseDto(
        String accessToken,
        long accessTokenExpiresInSeconds,
        String refreshToken,
        long refreshTokenExpiresInSeconds
) {}
