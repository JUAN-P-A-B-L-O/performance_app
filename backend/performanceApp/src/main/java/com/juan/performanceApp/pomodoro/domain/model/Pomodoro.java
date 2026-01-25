package com.juan.performanceApp.pomodoro.domain.model;

import java.time.Instant;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public class Pomodoro {
    private  UUID id;
    int minutes;
    PomodoroType type;
    private Instant _createdAt;
    private Instant _finishedAt;

    Boolean finished;
    PomodoroGroupId pomodoroGroupId;

    public Pomodoro (){

    }

    private Pomodoro(UUID id, int minutes, PomodoroType type, PomodoroGroupId groupId, Instant createdAt) {
        this.id = id;
        this.minutes = minutes;
        this.type = type;
        this.pomodoroGroupId = groupId;
        this._createdAt = createdAt;
    }
    public static Pomodoro start(UUID groupId, PomodoroType type, int minutes) {
        return new Pomodoro(UUID.randomUUID(),minutes, type,  new PomodoroGroupId(groupId) , Instant.now());
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


    public Instant get_createdAt() {
        return _createdAt;
    }

    public void set_createdAt(Instant _createdAt) {
        this._createdAt = _createdAt;
    }

    public Instant get_finishedAt() {
        return _finishedAt;
    }

    public void set_finishedAt(Instant _finishedAt) {
        this._finishedAt = _finishedAt;
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
