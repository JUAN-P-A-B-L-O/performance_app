package com.juan.performanceApp.user.adapter.web.dto;

import java.util.UUID;

public record UserDtoResponse(
         UUID id,
        String name,
        String email
) {
}
