package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;

import java.util.List;

public interface IPomodoroGroupRepository {
    public List<PomodoroGroup> findAll();
    public PomodoroGroup save(PomodoroGroup pomodoroGroup);
}
