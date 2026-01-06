package com.juan.performanceApp.pomodoro.adapter.web;


import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.application.service.PomodoroService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pomodoros")
public class PomodoroController {

    PomodoroService pomodoroService;

    public PomodoroController(PomodoroService pomodoroService) {
        this.pomodoroService = pomodoroService;
    }

    @GetMapping()
    public List<CreatePomodoroDto> findAll(){

        return pomodoroService.findAll();
    }

    @PostMapping()
    public CreatePomodoroDto createPomodoro(@RequestBody CreatePomodoroDto createPomodoroDto){
//        return pomodoroDto;
        return pomodoroService.createPomodoro(createPomodoroDto);
    }
}
