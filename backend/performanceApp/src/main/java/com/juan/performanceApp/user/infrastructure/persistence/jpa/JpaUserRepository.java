package com.juan.performanceApp.user.infrastructure.persistence.jpa;

import com.juan.performanceApp.user.domain.model.User;
import com.juan.performanceApp.user.domain.repository.UserRepositoryI;
import com.juan.performanceApp.user.infrastructure.persistence.entity.UserEntity;
import com.juan.performanceApp.user.infrastructure.persistence.mappers.UserEntityMapper;
import org.springframework.stereotype.Repository;

@Repository
public class JpaUserRepository implements UserRepositoryI {
    final private UserJpaRepository userJpaRepository;
    final private UserEntityMapper userEntityMapper;

    public JpaUserRepository(UserJpaRepository userJpaRepository, UserEntityMapper userEntityMapper){
        this.userJpaRepository = userJpaRepository;
        this.userEntityMapper = userEntityMapper;
    }

    @Override
    public User findByEmail(String email) {
        return null;
    }

    @Override
    public User create(User user) {
        UserEntity userEntity = this.userEntityMapper.toEntity(user);

        UserEntity savedUser = this.userJpaRepository.save(userEntity);

        return this.userEntityMapper
                .toDomain(savedUser);
    }
}
