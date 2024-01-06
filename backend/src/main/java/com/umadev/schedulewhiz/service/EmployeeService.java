package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.entity.Employee;
import java.util.Optional;

public interface EmployeeService {
  // List<Record> findAllRecords();
  Employee save(Employee theEmployee);

  Optional<Employee> getEmployeeById(Integer theId);

  Optional<Employee> findByEmail(String theEmail);
}
