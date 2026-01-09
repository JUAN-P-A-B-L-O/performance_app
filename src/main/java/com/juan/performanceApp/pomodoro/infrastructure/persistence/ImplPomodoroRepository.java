package com.juan.performanceApp.pomodoro.infrastructure.persistence;

import com.juan.performanceApp.pomodoro.domain.exception.ResourceNotFoundException;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa.PomodoroGroupJpaRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper.PomodoroEntityMapper;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa.PomodoroJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class ImplPomodoroRepository implements IPomodoroRepository {

    private final PomodoroJpaRepository pomodoroJpaRepository;
    private final PomodoroGroupJpaRepository pomodoroGroupJpaRepository;



    public ImplPomodoroRepository(PomodoroJpaRepository repository, PomodoroGroupJpaRepository pomodoroGroupJpaRepository) {
        this.pomodoroJpaRepository = repository;
        this.pomodoroGroupJpaRepository = pomodoroGroupJpaRepository;
    }

    @Override
    public List<Pomodoro> findAll() {
        List<PomodoroEntity> pomodoroEntities = pomodoroJpaRepository.findAll();

        return PomodoroEntityMapper.toDomainList(pomodoroEntities);
    }

    @Override
    public Pomodoro save(Pomodoro pomodoro){

        UUID groupId = pomodoro.getPomodoroGroupId().value();

        if (!pomodoroGroupJpaRepository.existsById(groupId)) {
            throw new ResourceNotFoundException("PomodoroGroup", groupId);
        }

        PomodoroGroupEntity groupRef = pomodoroGroupJpaRepository.getReferenceById(pomodoro.getPomodoroGroupId().value());

        PomodoroEntity pomodoroEntity = PomodoroEntityMapper.toEntity(pomodoro, groupRef);

        PomodoroEntity savedPomodoroEntity = pomodoroJpaRepository.save(pomodoroEntity);

        return  PomodoroEntityMapper.toDomain(savedPomodoroEntity);
    }

    @Override
    public Pomodoro findById(UUID id) {
        PomodoroEntity pomodoroEntity = pomodoroJpaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pomodoro", id));

        return PomodoroEntityMapper.toDomain(pomodoroEntity);
    }
}
