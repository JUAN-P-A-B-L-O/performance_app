package com.juan.performanceApp.pomodoro.service;

import com.juan.performanceApp.pomodoro.DTO.PomodoroDto;
import com.juan.performanceApp.pomodoro.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.mapper.PomodoroMapper;
import com.juan.performanceApp.pomodoro.repository.PomodoroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PomodoroService {

    @Autowired
    PomodoroRepository pomodoroRepository;

    public List<PomodoroDto> findAll(){

        List<PomodoroEntity> pomodoroEntities = pomodoroRepository.findAll();

        return PomodoroMapper.toDtoList(pomodoroEntities);
    }
}
