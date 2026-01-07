package com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PomodoroGroupJpaRepository extends JpaRepository<PomodoroGroupEntity, Long> {
}
