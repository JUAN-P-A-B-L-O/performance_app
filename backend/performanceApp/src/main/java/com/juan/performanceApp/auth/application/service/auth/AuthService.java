package com.juan.performanceApp.auth.application.service.auth;

public interface AuthService {

    LoginResult login(String email, String password);

}
