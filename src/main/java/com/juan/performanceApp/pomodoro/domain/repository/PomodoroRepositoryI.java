package com.juan.performanceApp.pomodoro.domain.repository;

import com.juan.performanceApp.pomodoro.domain.model.Pomodoro;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PomodoroRepositoryI {

    public List<Pomodoro> findAll();

    public Pomodoro save(Pomodoro pomodoro);
}
