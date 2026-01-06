package com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PomodoroEntityMapper {

    private PomodoroEntityMapper() {
        // utility class
    }

    /* =========================
       Entity -> Domain
       ========================= */

    public static Pomodoro toDomain(PomodoroEntity entity) {
        if (entity == null) {
            return null;
        }

        return new Pomodoro(
                entity.getMinutes(),
                entity.getType(),
//                entity.getGroup(),
                entity.getDate()
        );
    }

    public static List<Pomodoro> toDomainList(List<PomodoroEntity> entities) {
        if (entities == null || entities.isEmpty()) {
            return Collections.emptyList();
        }

        return entities.stream()
                .map(PomodoroEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    /* =========================
       Domain -> Entity
       ========================= */

    public static PomodoroEntity toEntity(Pomodoro domain) {
        if (domain == null) {
            return null;
        }

        PomodoroEntity entity = new PomodoroEntity(
               domain.getId(), domain.getMinutes(),domain.getType(), domain.getGroup(), domain.getDate()
        );

        return entity;
    }

    public static List<PomodoroEntity> toEntityList(List<Pomodoro> domains) {
        if (domains == null || domains.isEmpty()) {
            return Collections.emptyList();
        }

        return domains.stream()
                .map(PomodoroEntityMapper::toEntity)
                .collect(Collectors.toList());
    }
}