package com.juan.performanceApp.auth.application.service.token;

import com.juan.performanceApp.auth.application.service.auth.AuthenticatedUser;

public interface TokenService {
    String generateAccessToken(AuthenticatedUser authenticatedUser);
    String generateRefreshToken(AuthenticatedUser authenticatedUser);
    Boolean valitadeToken(String token);
    AuthenticatedUser parse(String token);

}
