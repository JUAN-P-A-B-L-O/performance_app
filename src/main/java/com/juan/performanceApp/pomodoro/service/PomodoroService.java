package com.juan.performanceApp.pomodoro.service;

import com.juan.performanceApp.pomodoro.DTO.PomodoroDto;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.PomodoroRepositoryI;
import com.juan.performanceApp.pomodoro.mapper.PomodoroDtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PomodoroService {

//    @Autowired
    PomodoroRepositoryI pomodoroRepository;

    public PomodoroService(PomodoroRepositoryI pomodoroRepository) {
        this.pomodoroRepository = pomodoroRepository;
    }

    public List<PomodoroDto> findAll(){

        List<Pomodoro> pomodoros = pomodoroRepository.findAll();

        return PomodoroDtoMapper.toDto(pomodoros);
    }
}
