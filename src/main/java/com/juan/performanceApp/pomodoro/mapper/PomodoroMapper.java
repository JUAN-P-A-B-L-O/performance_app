package com.juan.performanceApp.pomodoro.mapper;

import com.juan.performanceApp.pomodoro.DTO.PomodoroDto;
import com.juan.performanceApp.pomodoro.entity.PomodoroEntity;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public final class PomodoroMapper {

    private PomodoroMapper() {
        // prevents instantiation
    }

    public static PomodoroEntity toEntity(PomodoroDto dto) {
        if (dto == null) return null;

        PomodoroEntity entity = new PomodoroEntity(dto.minutes(), dto.type());

        return entity;
    }

    public static PomodoroDto toDto(PomodoroEntity entity) {
        if (entity == null) return null;

        return new PomodoroDto(
                entity.getMinutes(),
                entity.getType()
        );
    }

    public static List<PomodoroDto> toDtoList(List<PomodoroEntity> entities) {
        if (entities == null) return List.of();

        return entities.stream()
                .filter(Objects::nonNull)
                .map(PomodoroMapper::toDto)
                .collect(Collectors.toList());
    }
}
