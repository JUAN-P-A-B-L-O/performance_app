package com.juan.performanceApp.pomodoro.adapter.web.mapper;

import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.adapter.web.dto.PomodoroResponseDto;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroupId;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class PomodoroDtoMapper {

    private PomodoroDtoMapper() {
        // prevents instantiation
    }

    public static Pomodoro toDomain(CreatePomodoroDto dto) {
        if (dto == null) return null;

        Pomodoro pomodoro = Pomodoro.start(dto.pomodoroGroupId(),dto.type(), dto.minutes());

        return pomodoro;
    }

    public static PomodoroResponseDto toDto(Pomodoro pomodoro) {
        if (pomodoro == null) return null;

        return new PomodoroResponseDto(
                pomodoro.getId(),
                pomodoro.getMinutes(),
                pomodoro.getType(),
                pomodoro.get_createdAt(),
                pomodoro.getPomodoroGroupId().value()
        );
    }

    public static List<PomodoroResponseDto> toDto(List<Pomodoro> pomodoros) {
        if (pomodoros == null) return List.of();

        return pomodoros.stream()
                .filter(Objects::nonNull)
                .map(PomodoroDtoMapper::toDto)
                .collect(Collectors.toList());
    }
}
