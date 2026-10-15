
package com.kloudspot.employee_management.exception;
import com.kloudspot.employee_management.exception.EmployeeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEmployeeNotFound(
            EmployeeNotFoundException exception) {

        Map<String, String> error = Map.of(
                "error", "Employee Not Found",
                "message", exception.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

@ExceptionHandler(IllegalArgumentException.class)
public ResponseEntity<Map<String, String>> handleInvalidArgument(
        IllegalArgumentException exception) {

    Map<String, String> error = Map.of(
            "error", "Bad Request",
            "message", exception.getMessage()
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
}

}
