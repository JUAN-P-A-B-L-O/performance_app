package com.juan.performanceApp.pomodoro.controller;


import com.juan.performanceApp.pomodoro.DTO.PomodoroDto;
import com.juan.performanceApp.pomodoro.service.PomodoroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PomodoroController {

    @Autowired
    PomodoroService pomodoroService;

    @GetMapping("pomodoros")
    public List<PomodoroDto> findAll(){

        return pomodoroService.findAll();
    }
}
