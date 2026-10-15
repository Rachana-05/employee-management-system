
package com.kloudspot.employee_management.service;

import com.kloudspot.employee_management.entity.Employee;
import com.kloudspot.employee_management.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTests {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void getEmployeeByIdReturnsEmployeeWhenFound() {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Rachana");
        employee.setLastName("R");
        employee.setEmail("rachana.test@example.com");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee));

        Employee result = employeeService.getEmployeeById(1L);

        assertNotNull(result);
        assertEquals("Rachana", result.getFirstName());
        verify(employeeRepository).findById(1L);
    }

@Test
void getEmployeeByIdThrowsExceptionWhenNotFound() {
    when(employeeRepository.findById(999L))
            .thenReturn(Optional.empty());

    assertThrows(
            com.kloudspot.employee_management.exception.EmployeeNotFoundException.class,
            () -> employeeService.getEmployeeById(999L)
    );

    verify(employeeRepository).findById(999L);
}

}
