package com.juan.performanceApp.user.domain.service;

import com.juan.performanceApp.user.domain.model.User;

public interface IUserService {
    public User findUserByEmail(String email);
}
