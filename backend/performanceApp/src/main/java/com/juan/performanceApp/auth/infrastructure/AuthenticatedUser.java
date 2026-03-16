package com.juan.performanceApp.auth.infrastructure;

import java.util.List;
import java.util.UUID;

public record AuthenticatedUser(UUID id, List<String> roles) {
}
