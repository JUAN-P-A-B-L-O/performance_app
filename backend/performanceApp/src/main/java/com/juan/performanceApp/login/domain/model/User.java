package com.juan.performanceApp.login.domain.model;

import java.util.Objects;
import java.util.UUID;

public final class User {
    private final UUID id;                 // can be null for new user, or use factories
    private final String name;
    private final String email;            // store normalized
    private final String passwordHash;     // never raw password

    private User(UUID id, String name, String email, String passwordHash) {
        this.id = id;
        this.name = requireNotBlank(name, "name");
        this.email = normalizeEmail(email);
        this.passwordHash = requireNotBlank(passwordHash, "passwordHash");
    }

    public static User newUser(String name, String email, String passwordHash) {
        return new User(null, name, email, passwordHash);
    }

    public static User existing(UUID id, String name, String email, String passwordHash) {
        return new User(Objects.requireNonNull(id, "id"), name, email, passwordHash);
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    // Intentionally no getPasswordHash() if you want extra safety.
    // If you need it for persistence mapping, expose it carefully (package-private).
    String passwordHash() { return passwordHash; }

    private static String normalizeEmail(String email) {
        email = requireNotBlank(email, "email").trim().toLowerCase();
        if (!email.contains("@")) throw new IllegalArgumentException("Invalid email");
        return email;
    }

    private static String requireNotBlank(String v, String field) {
        if (v == null || v.trim().isEmpty()) throw new IllegalArgumentException(field + " is blank");
        return v;
    }
}
