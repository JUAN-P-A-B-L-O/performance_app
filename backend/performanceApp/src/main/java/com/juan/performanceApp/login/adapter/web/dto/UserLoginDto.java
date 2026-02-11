package com.juan.performanceApp.login.adapter.web.dto;

import jakarta.validation.constraints.NotNull;

public record UserLoginDto(@NotNull String email ,@NotNull String password) {
}
