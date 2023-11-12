package com.umadev.schedulewhiz.service;

import java.util.List;

import com.umadev.schedulewhiz.entity.Employee;
import com.umadev.schedulewhiz.entity.Record;

public interface EmployeeService {
    //List<Record> findAllRecords(); 
    public Employee save(Employee theEmployee);
}
