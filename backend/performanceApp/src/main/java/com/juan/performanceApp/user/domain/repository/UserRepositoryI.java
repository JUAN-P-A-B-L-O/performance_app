package com.juan.performanceApp.user.domain.repository;

import com.juan.performanceApp.user.domain.model.User;

import java.util.List;

public interface UserRepositoryI {
     User findByEmail(String email);
     User create(User user);
     List<User> findAll();
}
