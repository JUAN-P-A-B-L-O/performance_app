package com.juan.performanceApp.pomodoro.repository;

import com.juan.performanceApp.pomodoro.entity.PomodoroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PomodoroRepository extends JpaRepository<PomodoroEntity, Long> {

//    List<PomodoroEntity> findByType(PomodoroType type);
//
//    long countByType(PomodoroType type);
}
