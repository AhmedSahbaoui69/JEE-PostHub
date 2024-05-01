package com.example.foorum.exceptions;

public class SpringFoorumException extends RuntimeException {
    public SpringFoorumException(String exMessage, Exception exception) {
        super(exMessage, exception);
    }

    public SpringFoorumException(String exMessage) {
        super(exMessage);
    }
}