package com.juan.performanceApp.user.domain.service;

import com.juan.performanceApp.user.domain.model.User;

public interface IUserService {
    User findUserByEmail(String email);

    User createUser(User user);
}
