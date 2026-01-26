package com.juan.performanceApp.pomodoro.domain.model;

import java.time.Instant;
import java.util.UUID;

public class Pomodoro {
    private final UUID id;
    private final int minutes;
    private final PomodoroType type;
    private final Instant _createdAt;
    private Instant _finishedAt;

    Boolean finished;
    PomodoroGroupId pomodoroGroupId;

    private Pomodoro(UUID id, int minutes, PomodoroType type, PomodoroGroupId groupId,
                     Instant createdAt, Instant finisheAt) {
        this.id = id;
        this.minutes = minutes;
        this.type = type;
        this.pomodoroGroupId = groupId;
        this._createdAt = createdAt;
        this._finishedAt = finisheAt;
    }
    public static Pomodoro start(UUID groupId, PomodoroType type, int minutes) {
        return new Pomodoro(UUID.randomUUID(),minutes, type,  new PomodoroGroupId(groupId) , Instant.now(), null);
    }

    public static Pomodoro from (UUID id, int minutes, PomodoroType type, Instant _createdAt, Instant _finishedAt, UUID groupId ){
        return new Pomodoro(id, minutes, type,   new PomodoroGroupId(groupId), _createdAt, _finishedAt);
    }




    public UUID getId() {
        return id;
    }




    ///  getters and setters
    ///


    public int getMinutes() {
        return minutes;
    }
    public PomodoroType getType() {
        return type;
    }
    public Instant get_createdAt() {
        return _createdAt;
    }
    public Instant get_finishedAt() {
        return _finishedAt;
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
