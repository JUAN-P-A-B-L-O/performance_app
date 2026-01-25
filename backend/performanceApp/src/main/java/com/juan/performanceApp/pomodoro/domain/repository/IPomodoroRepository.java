package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;

import java.util.List;
import java.util.UUID;

public interface IPomodoroRepository {

    public List<Pomodoro> findAll();

    public Pomodoro save(Pomodoro pomodoro);

    public Pomodoro findById(UUID id);
}
