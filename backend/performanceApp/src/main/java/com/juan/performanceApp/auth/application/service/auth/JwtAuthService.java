package com.juan.performanceApp.auth.application.service.auth;

import com.juan.performanceApp.auth.application.service.token.TokenService;
import com.juan.performanceApp.user.domain.model.User;
import com.juan.performanceApp.user.domain.repository.UserRepositoryI;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JwtAuthService implements AuthService {
    final private TokenService tokenService;
    final private UserRepositoryI userRepository;

    public JwtAuthService(TokenService tokenService, UserRepositoryI userRepository){
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }


    @Override
    public LoginResult login(String email, String password) {
        User foundUser =  userRepository.findByEmail(email);
        AuthenticatedUser authenticatedUser = new AuthenticatedUser(
                foundUser.getId(),
                List.of("teste")
        );

        LoginResult loginResult = new LoginResult(
                tokenService.generateAccessToken(authenticatedUser),
                1000,
                tokenService.generateRefreshToken(authenticatedUser),
                1231231
        );

        return loginResult;
    }
}
