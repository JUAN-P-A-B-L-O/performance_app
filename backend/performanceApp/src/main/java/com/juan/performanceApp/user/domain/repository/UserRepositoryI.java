package com.juan.performanceApp.user.domain.repository;

import com.juan.performanceApp.user.domain.model.User;

public interface UserRepositoryI {
     User findByEmail(String email);
     User create(User user);
}
