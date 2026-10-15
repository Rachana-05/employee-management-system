
package com.kloudspot.employee_management.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.kloudspot.employee_management.entity.Employee;
import com.kloudspot.employee_management.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Create an employee
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    // Update an employee
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // Delete an employee
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

@GetMapping("/search")
public List<Employee> searchEmployees(@RequestParam String keyword) {
    return employeeService.searchEmployees(keyword);
}

@GetMapping("/filter/department")
public List<Employee> filterByDepartment(
        @RequestParam String department) {
    return employeeService.filterByDepartment(department);
}

@GetMapping("/filter/status")
public List<Employee> filterByStatus(
        @RequestParam String status) {
    return employeeService.filterByStatus(status);
}

@GetMapping("/page")
public Page<Employee> getEmployeesPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {

    return employeeService.getEmployeesPaginated(page, size);
}

}
