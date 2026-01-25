package com.juan.performanceApp.pomodoro.infrastructure.persistence.mapper;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroupId;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroEntity;
import com.juan.performanceApp.pomodoro.infrastructure.persistence.entity.PomodoroGroupEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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

        return  Pomodoro.start(
                entity.getGroup().getId(),
                entity.getType()
                entity.getId(),
                entity.getMinutes(),
                ,
                entity.get_createdAt(),
                new PomodoroGroupId()
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

    public static PomodoroEntity toEntity(Pomodoro domain, PomodoroGroupEntity groupEntity) {
        if (domain == null) {
            return null;
        }

        PomodoroEntity entity = new PomodoroEntity(
               domain.getId(), domain.getMinutes(),domain.getType(), groupEntity
        );

        return entity;
    }

//    public static List<PomodoroEntity> toEntityList(List<Pomodoro> domains, Map<UUID, PomodoroGroupEntity> pomodoroGroupEntityMap) {
//        if (domains == null || domains.isEmpty()) {
//            return Collections.emptyList();
//        }
//
//        return domains.stream()
//                .map(PomodoroEntityMapper::toEntity)
//                .collect(Collectors.toList());
//    }
}