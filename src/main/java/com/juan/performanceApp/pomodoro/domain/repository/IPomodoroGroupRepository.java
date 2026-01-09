package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;

import java.util.List;
import java.util.UUID;

public interface IPomodoroGroupRepository {
    public List<PomodoroGroup> findAll();
    public PomodoroGroup save(PomodoroGroup pomodoroGroup);
    public PomodoroGroup findById(UUID id);
}
