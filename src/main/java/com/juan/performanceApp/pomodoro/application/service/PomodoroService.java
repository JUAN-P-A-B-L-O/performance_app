package com.juan.performanceApp.pomodoro.application.service;

import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.PomodoroRepositoryI;
import com.juan.performanceApp.pomodoro.adapter.web.mapper.PomodoroDtoMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PomodoroService {
    PomodoroRepositoryI pomodoroRepository;

    public PomodoroService(PomodoroRepositoryI pomodoroRepository) {
        this.pomodoroRepository = pomodoroRepository;
    }

    public List<CreatePomodoroDto> findAll(){

        List<Pomodoro> pomodoros = pomodoroRepository.findAll();

        return PomodoroDtoMapper.toDto(pomodoros);
    }

    public CreatePomodoroDto createPomodoro(CreatePomodoroDto createPomodoroDto){
        Pomodoro pomodoro = PomodoroDtoMapper.toDomain(createPomodoroDto);

        Pomodoro savedPomodoro = pomodoroRepository.save(pomodoro);
        return PomodoroDtoMapper.toDto(savedPomodoro);
    }
}
