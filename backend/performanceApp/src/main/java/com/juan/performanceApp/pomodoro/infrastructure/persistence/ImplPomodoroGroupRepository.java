package com.juan.performanceApp.pomodoro.infrastructure.persistence;

import com.juan.performanceApp.pomodoro.domain.exception.ResourceNotFoundException;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroGroupRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa.PomodoroGroupJpaRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper.PomodoroGroupEntityMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ImplPomodoroGroupRepository implements IPomodoroGroupRepository {
    private final PomodoroGroupJpaRepository pomodoroGroupJpaRepository;

    public ImplPomodoroGroupRepository(PomodoroGroupJpaRepository pomodoroGroupJpaRepository) {
        this.pomodoroGroupJpaRepository = pomodoroGroupJpaRepository;
    }

    @Override
    public List<PomodoroGroup> findAll() {
        return PomodoroGroupEntityMapper
                .toDomainList(pomodoroGroupJpaRepository.findAll());
    }

    @Override
    public PomodoroGroup save(PomodoroGroup pomodoroGroup){
        PomodoroGroupEntity savedPomodoroGroupEntity = pomodoroGroupJpaRepository
                .save(PomodoroGroupEntityMapper.toEntity(pomodoroGroup));

        return PomodoroGroupEntityMapper.toDomain(savedPomodoroGroupEntity);
    }

    @Override
    public PomodoroGroup findById(UUID id) {
        PomodoroGroupEntity pomodoroGroupEntity =  pomodoroGroupJpaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PomodoroGroup", id));

        return PomodoroGroupEntityMapper.toDomain(pomodoroGroupEntity);
    }


}
