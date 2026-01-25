package com.juan.performanceApp.pomodoro.adapter.web.mapper;

import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroGroupDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.PomodoGroupResponseDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.PomodoroResponseDto;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class PomodoGroupDtoMapper {

    private PomodoGroupDtoMapper() {
        // prevents instantiation
    }

    public static PomodoroGroup toDomain(CreatePomodoroGroupDto dto) {
        if (dto == null) return null;

        PomodoroGroup pomodoroGroup = new PomodoroGroup(null, dto.name(), dto.description());

        return pomodoroGroup;
    }

    public static PomodoGroupResponseDto toDto(PomodoroGroup pomodoroGroup) {
        if (pomodoroGroup == null) return null;

        return new PomodoGroupResponseDto(
                pomodoroGroup.getId(),
                pomodoroGroup.getName(),
                pomodoroGroup.getDescription()
        );
    }

    public static List<PomodoGroupResponseDto> toDto(List<PomodoroGroup> pomodoroGroups) {
        if (pomodoroGroups == null) return List.of();

        return pomodoroGroups.stream()
                .filter(Objects::nonNull)
                .map(PomodoGroupDtoMapper::toDto)
                .collect(Collectors.toList());
    }


}
