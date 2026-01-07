package com.juan.performanceApp.pomodoro.adapter.web.dto;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;


public record CreatePomodoroDto(
        @NotNull @Min(1) @Max(240) Integer minutes,
        @NotNull PomodoroType type,
        @NotNull LocalDate date,
        UUID pomodoroGroupId
) {}
