package com.juan.performanceApp.pomodoro.domain.model;

import java.util.UUID;

public record PomodoroGroupId(UUID value) {

    public PomodoroGroupId {
        if (value == null) {
            throw new IllegalArgumentException("PomodoroGroupId cannot be null");
        }
    }

    public static PomodoroGroupId newId() {
        return new PomodoroGroupId(UUID.randomUUID());
    }

    public static PomodoroGroupId from(String raw) {
        return new PomodoroGroupId(UUID.fromString(raw));
    }
}
