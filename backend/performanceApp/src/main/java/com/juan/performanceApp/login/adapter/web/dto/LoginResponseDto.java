package com.juan.performanceApp.login.adapter.web.dto;

public record LoginResponseDto(
        String accessToken,
        long accessTokenExpiresInSeconds,
        String refreshToken,
        long refreshTokenExpiresInSeconds
) {}
