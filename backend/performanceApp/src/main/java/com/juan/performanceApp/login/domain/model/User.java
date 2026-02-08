package com.juan.performanceApp.login.domain.model;


import java.util.UUID;

public class User {
    private UUID id;
    private final String name;
    private final String email;
    private final String password;

    public User(String name, String email, String password, UUID id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }

    public UUID getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
