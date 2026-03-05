package com.juan.performanceApp.auth.application.service.auth;

import java.util.List;
import java.util.UUID;

public record AuthenticatedUser(UUID id, List<String> roles) {
}
