package com.juan.performanceApp.pomodoro.DTO;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;
import com.juan.performanceApp.pomodoro.domain.model.PomodoroType;

import java.time.LocalDate;

public record PomodoroDto(int minutes, PomodoroType type, PomodoroGroup group, LocalDate date) {
}
