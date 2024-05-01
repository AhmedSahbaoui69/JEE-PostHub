package com.example.foorum.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Data
public class ApiException {
    private final String message;
    private final HttpStatus httpStatus;
    private Map<String, String> errors;

    public ApiException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public ApiException(String message, HttpStatus httpStatus, Map<String, String> errors) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.errors = errors;
    }
}