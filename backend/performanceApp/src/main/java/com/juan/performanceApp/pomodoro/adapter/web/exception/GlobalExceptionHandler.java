package com.juan.performanceApp.pomodoro.adapter.web.exception;

import com.juan.performanceApp.pomodoro.domain.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handle(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "timestamp", Instant.now().toString(),
                "errorCode", "RESOURCE_NOT_FOUND",
                "message", ex.getResource() + " not found",
                "resource", ex.getResource(),
                "id", ex.getIdentifier()
        ));
    }


}
