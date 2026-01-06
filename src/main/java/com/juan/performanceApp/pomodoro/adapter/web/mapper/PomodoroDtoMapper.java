package com.juan.performanceApp.pomodoro.adapter.web.mapper;

import com.juan.performanceApp.pomodoro.adapter.web.dto.CreatePomodoroDto;
import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class PomodoroDtoMapper {

    private PomodoroDtoMapper() {
        // prevents instantiation
    }

    public static Pomodoro toDomain(CreatePomodoroDto dto) {
        if (dto == null) return null;

        Pomodoro pomodoro = new Pomodoro(dto.minutes(), dto.type(), dto.date());

        return pomodoro;
    }

    public static CreatePomodoroDto toDto(Pomodoro pomodoro) {
        if (pomodoro == null) return null;

        return new CreatePomodoroDto(
                pomodoro.getMinutes(),
                pomodoro.getType(),
//                pomodoro.getGroup(),
                pomodoro.getDate()
        );
    }

    public static List<CreatePomodoroDto> toDto(List<Pomodoro> pomodoros) {
        if (pomodoros == null) return List.of();

        return pomodoros.stream()
                .filter(Objects::nonNull)
                .map(PomodoroDtoMapper::toDto)
                .collect(Collectors.toList());
    }
}
