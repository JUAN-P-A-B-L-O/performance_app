package com.juan.performanceApp.pomodoro.domain.model;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public class Pomodoro {
    private  UUID id;
    int minutes;
    PomodoroType type;
    private OffsetDateTime _createdAt;
    Boolean finished;
    PomodoroGroupId pomodoroGroupId;

    public Pomodoro (){

    }

    public Pomodoro(UUID id, int minutes, PomodoroType type, OffsetDateTime date, PomodoroGroupId groupId) {
        this.id = id;
        this.minutes = minutes;
        this.type = type;
        this.pomodoroGroupId = groupId;
        this._createdAt = date;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    ///  getters and setters
    ///


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

    public OffsetDateTime get_createdAt() {
        return _createdAt;
    }

    public void set_createdAt(OffsetDateTime _createdAt) {
        this._createdAt = _createdAt;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public PomodoroGroupId getPomodoroGroupId() {
        return pomodoroGroupId;
    }

    public void setPomodoroGroupId(PomodoroGroupId pomodoroGroupId) {
        this.pomodoroGroupId = pomodoroGroupId;
    }
}
