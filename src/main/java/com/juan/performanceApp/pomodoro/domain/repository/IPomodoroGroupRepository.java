package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.PomodoroGroup;

public interface IPomodoroGroupRepository {

    public PomodoroGroup save(PomodoroGroup pomodoroGroup);
}
