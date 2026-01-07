package com.juan.performanceApp.pomodoro.adapter.web;


import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.PomodoroResponseDto;
import com.juan.performanceApp.pomodoro.adapter.web.mapper.PomodoroDtoMapper;
import com.juan.performanceApp.pomodoro.application.service.PomodoroService;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<PomodoroResponseDto>> findAll(){
        List<Pomodoro> pomodoros = pomodoroService.findAll();

        return ResponseEntity.status(HttpStatus.OK)
                .body(PomodoroDtoMapper.toDto(pomodoros));
    }

    @PostMapping()
    public ResponseEntity<PomodoroResponseDto> createPomodoro(@RequestBody CreatePomodoroDto createPomodoroDto){
        Pomodoro createdPomodoro = pomodoroService
                .createPomodoro(PomodoroDtoMapper.toDomain(createPomodoroDto));

        return ResponseEntity.status(HttpStatus.CREATED).body(PomodoroDtoMapper.toDto(createdPomodoro));
    }
}
