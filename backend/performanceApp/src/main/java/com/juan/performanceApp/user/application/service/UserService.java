package com.juan.performanceApp.user.application.service;

import com.juan.performanceApp.user.domain.model.User;
import com.juan.performanceApp.user.domain.repository.UserRepositoryI;
import com.juan.performanceApp.user.domain.service.IUserService;
import com.juan.performanceApp.user.infrastructure.persistence.jpa.UserJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService implements IUserService
{
    final private UserRepositoryI userRepository;

    public UserService(UserRepositoryI userRepositoryI){
        this.userRepository = userRepositoryI;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public User createUser(User user) {
        User createdUser = userRepository.create(user);

        return createdUser;
    }

    @Override
    public List<User> findAll() {
        List users = userRepository.findAll();

        return users;
    }


}
