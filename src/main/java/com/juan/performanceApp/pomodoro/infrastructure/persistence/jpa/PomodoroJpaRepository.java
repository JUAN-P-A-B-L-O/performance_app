package com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa;

import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PomodoroJpaRepository extends JpaRepository<PomodoroEntity, Long> {

}
