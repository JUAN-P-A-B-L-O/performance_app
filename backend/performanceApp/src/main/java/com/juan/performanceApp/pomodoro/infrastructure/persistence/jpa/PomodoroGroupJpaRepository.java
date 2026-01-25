package com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa;

import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PomodoroGroupJpaRepository extends JpaRepository<PomodoroGroupEntity, UUID> {
}
