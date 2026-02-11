package com.juan.performanceApp.security;

public interface TokenService {
    boolean isValid(String token);
    String getUserId(String token);
}