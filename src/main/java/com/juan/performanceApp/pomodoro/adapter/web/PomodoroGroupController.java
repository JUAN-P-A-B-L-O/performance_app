package com.juan.performanceApp.pomodoro.adapter.web;

import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroGroupDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.PomodoGroupResponseDto;
import com.juan.performanceApp.pomodoro.adapter.web.mapper.PomodoGroupDtoMapper;
import com.juan.performanceApp.pomodoro.application.service.PomodoroGroupService;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pomodoroGroups")
public class PomodoroGroupController {
    private final PomodoroGroupService pomodoroGroupService;

    public PomodoroGroupController(PomodoroGroupService pomodoroGroupService) {
       this.pomodoroGroupService = pomodoroGroupService;
    }

    @GetMapping
    public ResponseEntity<List<PomodoGroupResponseDto>> findAll(){
        List<PomodoroGroup> pomodoroGroups = pomodoroGroupService.findAll();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(PomodoGroupDtoMapper.toDto(pomodoroGroups));
    }

    @PostMapping
    public ResponseEntity<PomodoGroupResponseDto> createPomodoroGroup(@RequestBody @Valid CreatePomodoroGroupDto createPomodoroGroupDto){
        PomodoroGroup createdPomodoroGroup = pomodoroGroupService
                .createPomodoroGroup(PomodoGroupDtoMapper.toDomain(createPomodoroGroupDto));



        return ResponseEntity.status(HttpStatus.CREATED).body(PomodoGroupDtoMapper.toDto(createdPomodoroGroup));
    }
}
