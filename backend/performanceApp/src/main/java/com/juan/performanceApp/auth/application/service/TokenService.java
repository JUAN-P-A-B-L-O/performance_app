package com.juan.performanceApp.auth.application.service;

public interface TokenService {
    String generateAccessToken();
    String generateRefreshToken();
    Boolean valitadeToken();
    Boolean parse();

}
