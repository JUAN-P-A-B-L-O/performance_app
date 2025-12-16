package com.juan.performanceApp.pomodoro.domain.model;

import java.time.LocalDate;
import java.util.UUID;

public class Pomodoro {
    UUID id;
    int minutes;
    PomodoroType type;
    PomodoroGroup group;
    LocalDate date;
    Boolean finished;


    public Pomodoro (){

    }

    public Pomodoro(int minutes, PomodoroType type, LocalDate date) {
        this.minutes = minutes;
        this.type = type;
//        this.group = group;
        this.date = date;
    }



    ///  getters and setters
    ///
    public UUID getId() {
        return id;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public PomodoroType getType() {
        return type;
    }

    public void setType(PomodoroType type) {
        this.type = type;
    }

    public PomodoroGroup getGroup() {
        return group;
    }

    public void setGroup(PomodoroGroup group) {
        this.group = group;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }
}
