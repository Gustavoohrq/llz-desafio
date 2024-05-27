package com.gustavo.pessoa.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceIsExistException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ResourceIsExistException(String message) {
        super(message);
    }
}
