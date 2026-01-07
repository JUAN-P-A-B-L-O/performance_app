package com.juan.performanceApp.pomodoro.application.service;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.domain.repository.IPomodoroGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PomodoroGroupService {
    private final IPomodoroGroupRepository pomodoroGroupRepository;

    public PomodoroGroupService(IPomodoroGroupRepository pomodoroGroupRepository){
        this.pomodoroGroupRepository = pomodoroGroupRepository;
    }

    public List<PomodoroGroup> findAll(){
        return pomodoroGroupRepository.findAll();
    }

    public PomodoroGroup createPomodoroGroup(PomodoroGroup pomodoroGroup){

        PomodoroGroup createdPomodoroGroup = pomodoroGroupRepository.save(pomodoroGroup);

        return createdPomodoroGroup;
    }

}
