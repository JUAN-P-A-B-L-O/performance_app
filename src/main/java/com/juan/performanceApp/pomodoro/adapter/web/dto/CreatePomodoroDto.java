package com.juan.performanceApp.pomodoro.adapter.web.dto;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroType;

import java.time.LocalDate;

public record CreatePomodoroDto(int minutes, PomodoroType type, LocalDate date) {
}
