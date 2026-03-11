package com.juan.performanceApp.user.application.service;

import com.juan.performanceApp.user.domain.model.User;
import com.juan.performanceApp.user.domain.service.IUserService;
import org.springframework.stereotype.Service;


@Service
public class UserService implements IUserService
{
    @Override
    public User findUserByEmail(String email) {
        return null;
    }
}
