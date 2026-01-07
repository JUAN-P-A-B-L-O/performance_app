package com.juan.performanceApp.pomodoro.infrastructure.persistence;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroGroupRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa.PomodoroGroupJpaRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper.PomodoroGroupEntityMapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public class ImplPomodoroGroupRepository implements IPomodoroGroupRepository {
    private final PomodoroGroupJpaRepository pomodoroGroupJpaRepository;

    public ImplPomodoroGroupRepository(PomodoroGroupJpaRepository pomodoroGroupJpaRepository) {
        this.pomodoroGroupJpaRepository = pomodoroGroupJpaRepository;
    }

    @Override
    public PomodoroGroup save(PomodoroGroup pomodoroGroup){
        PomodoroGroupEntity savedPomodoroGroupEntity = pomodoroGroupJpaRepository
                .save(PomodoroGroupEntityMapper.toEntity(pomodoroGroup));

        return PomodoroGroupEntityMapper.toDomain(savedPomodoroGroupEntity);
    }
}
