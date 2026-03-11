package com.juan.performanceApp.user.infrastructure.persistence.jpa;

import com.juan.performanceApp.user.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {
}
