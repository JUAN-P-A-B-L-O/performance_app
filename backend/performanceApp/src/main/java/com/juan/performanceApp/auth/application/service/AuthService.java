package com.juan.performanceApp.auth.application.service;

import com.juan.performanceApp.auth.adapter.web.dto.LoginResponseDto;

public interface AuthService {

    LoginResponseDto login(String email, String password);

}
