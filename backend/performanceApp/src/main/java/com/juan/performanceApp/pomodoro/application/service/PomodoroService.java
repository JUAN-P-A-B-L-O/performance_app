package com.juan.performanceApp.pomodoro.application.service;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PomodoroService {
    IPomodoroRepository pomodoroRepository;

    public PomodoroService(IPomodoroRepository pomodoroRepository) {
        this.pomodoroRepository = pomodoroRepository;
    }

    public List<Pomodoro> findAll(){
        return pomodoroRepository.findAll();
    }

    public Pomodoro findById(UUID id){
        return pomodoroRepository.findById(id);
    }

    public Pomodoro createPomodoro(Pomodoro pomodoro){
        return pomodoroRepository.save(pomodoro);
    }
}
