package com.umadev.schedulewhiz.service;

import java.util.List;
import java.util.Optional;

import com.umadev.schedulewhiz.entity.Employee;
import com.umadev.schedulewhiz.entity.Record;

public interface EmployeeService {
    //List<Record> findAllRecords(); 
    Employee save(Employee theEmployee);
    Optional<Employee> getEmployeeById(Integer theId);
}
