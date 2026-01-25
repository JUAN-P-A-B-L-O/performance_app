package com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PomodoroGroupEntityMapper {
    private PomodoroGroupEntityMapper() {
        // utility class
    }

    /* =========================
       Entity -> Domain
       ========================= */

    public static PomodoroGroup toDomain(PomodoroGroupEntity entity) {
        if (entity == null) {
            return null;
        }

        return new PomodoroGroup(
                entity.getId(),
                entity.getName(),
                entity.getDescription()
        );
    }

    public static List<PomodoroGroup> toDomainList(List<PomodoroGroupEntity> entities) {
        if (entities == null || entities.isEmpty()) {
            return Collections.emptyList();
        }

        return entities.stream()
                .map(PomodoroGroupEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    /* =========================
       Domain -> Entity
       ========================= */

    public static PomodoroGroupEntity toEntity(PomodoroGroup domain) {
        if (domain == null) {
            return null;
        }

        PomodoroGroupEntity entity = new PomodoroGroupEntity(
                domain.getId(), domain.getName(), domain.getDescription()
        );

        return entity;
    }

    public static List<PomodoroGroupEntity> toEntityList(List<PomodoroGroup> domains) {
        if (domains == null || domains.isEmpty()) {
            return Collections.emptyList();
        }

        return domains.stream()
                .map(PomodoroGroupEntityMapper::toEntity)
                .collect(Collectors.toList());
    }
}
