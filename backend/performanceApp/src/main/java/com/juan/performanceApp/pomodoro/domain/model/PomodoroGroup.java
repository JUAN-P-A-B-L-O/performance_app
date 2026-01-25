package com.juan.performanceApp.pomodoro.domain.model;

import java.util.UUID;

public class PomodoroGroup {
    UUID id;
    String name;
    String description;

    public PomodoroGroup(UUID id, String name, String description){
        this.id = id;
        this.name = name;
        this.description = description;
    }




    ///  getters and setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
