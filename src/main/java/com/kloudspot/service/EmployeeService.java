package com.kloudspot.employee_management.service;

import com.kloudspot.employee_management.service.EmployeeService;
import com.kloudspot.employee_management.entity.Employee;
import com.kloudspot.employee_management.repository.EmployeeRepository;
import com.kloudspot.employee_management.exception.EmployeeNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {
    return employeeRepository.findById(id)
            .orElseThrow(() ->
                    new com.kloudspot.employee_management.exception
                            .EmployeeNotFoundException(
                                    "Employee not found with ID: " + id));
    }

    // Create an employee
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update an employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existingEmployee = getEmployeeById(id);

        existingEmployee.setFirstName(updatedEmployee.getFirstName());
        existingEmployee.setLastName(updatedEmployee.getLastName());
        existingEmployee.setEmail(updatedEmployee.getEmail());
        existingEmployee.setDepartment(updatedEmployee.getDepartment());
        existingEmployee.setSalary(updatedEmployee.getSalary());
        existingEmployee.setJoiningDate(updatedEmployee.getJoiningDate());
        existingEmployee.setStatus(updatedEmployee.getStatus());

        return employeeRepository.save(existingEmployee);
    }

    // Delete an employee
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

    public java.util.List<Employee> searchEmployees(String keyword) {
        return employeeRepository
            .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                    keyword, keyword, keyword
            );
}

public java.util.List<Employee> filterByDepartment(String department) {
    return employeeRepository.findByDepartmentIgnoreCase(department);
}

public java.util.List<Employee> filterByStatus(String status) {
    return employeeRepository.findByStatusIgnoreCase(status);
}


public Page<Employee> getEmployeesPaginated(int page, int size) {
    if (page < 0) {
        throw new IllegalArgumentException("Page number cannot be negative");
    }

    if (size < 1 || size > 100) {
        throw new IllegalArgumentException(
                "Page size must be between 1 and 100");
    }

    Pageable pageable = PageRequest.of(page, size);
    return employeeRepository.findAll(pageable);
}


}
