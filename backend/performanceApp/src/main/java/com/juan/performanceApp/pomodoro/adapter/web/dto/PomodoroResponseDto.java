package com.juan.performanceApp.pomodoro.adapter.web.dto;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroType;

import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PomodoroResponseDto(UUID id, int minutes, PomodoroType type, Instant date, UUID pomodoroGroupId) {
}
