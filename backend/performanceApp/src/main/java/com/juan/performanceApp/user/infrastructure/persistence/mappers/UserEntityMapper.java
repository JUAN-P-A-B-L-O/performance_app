package com.juan.performanceApp.user.infrastructure.persistence.mappers;

import com.juan.performanceApp.user.domain.model.User;
import com.juan.performanceApp.user.infrastructure.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserEntityMapper {

    public UserEntity toEntity(User user){
        if(user == null) return null;

        return new UserEntity(
            user.getName(),
            user.getEmail(),
            user.getPasswordHash()
        );
    }

    public User toDomain(UserEntity userEntity){
        if(userEntity == null) return null;

        return User.existing(
            userEntity.getId(),
            userEntity.getName(),
            userEntity.getEmail(),
            userEntity.getPassword()
        );
    }

    public List<User> toDomainList(List<UserEntity> usersEntities) {
        if(usersEntities == null) return null;

        return usersEntities
                .stream()
                .map(this::toDomain)
                .toList();
    }
}
