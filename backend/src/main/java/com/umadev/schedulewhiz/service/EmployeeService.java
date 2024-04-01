package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.entity.Employee;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
  List<Employee> findAll();

  Employee save(Employee theEmployee);

  Optional<Employee> getEmployeeById(Integer theId);

  Optional<Employee> findByEmail(String theEmail);

  List<Employee> findByTeamId(Long theTeamId);
}
