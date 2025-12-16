package com.juan.performanceApp.pomodoro.infrastructure.persistence;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.PomodoroRepositoryI;
import com.juan.performanceApp.pomodoro.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper.PomodoroEntityMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PomodoroRepositoryImpl implements PomodoroRepositoryI {

    private final JpaRepository repository;


    public PomodoroRepositoryImpl(JpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Pomodoro> findAll() {
        List<PomodoroEntity> pomodoroEntities = repository.findAll();

        List<Pomodoro> pomodorosDomain = PomodoroEntityMapper.toDomainList(pomodoroEntities);
        return List.of();
    }
}
