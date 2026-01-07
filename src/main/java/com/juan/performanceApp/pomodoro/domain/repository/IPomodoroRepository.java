package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;

import java.util.List;

public interface IPomodoroRepository {

    public List<Pomodoro> findAll();

    public Pomodoro save(Pomodoro pomodoro);
}
