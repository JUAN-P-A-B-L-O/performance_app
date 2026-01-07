package com.juan.performanceApp.pomodoro.infrastructure.persistence;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroRepository;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper.PomodoroEntityMapper;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.jpa.PomodoroJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ImplPomodoroRepository implements IPomodoroRepository {

    private final PomodoroJpaRepository repository;



    public ImplPomodoroRepository(PomodoroJpaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Pomodoro> findAll() {
        List<PomodoroEntity> pomodoroEntities = repository.findAll();

        return PomodoroEntityMapper.toDomainList(pomodoroEntities);
    }

    @Override
    public Pomodoro save(Pomodoro pomodoro){
        PomodoroEntity pomodoroEntity = PomodoroEntityMapper.toEntity(pomodoro);

        PomodoroEntity savedPomodoroEntity = repository.save(pomodoroEntity);

        return  PomodoroEntityMapper.toDomain(savedPomodoroEntity);
    }
}
