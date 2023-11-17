package com.umadev.schedulewhiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umadev.schedulewhiz.dao.EmployeeRepository;
import com.umadev.schedulewhiz.entity.Employee;
import com.umadev.schedulewhiz.entity.Record;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    
    @Autowired
    public EmployeeServiceImpl(EmployeeRepository theEmployeeRepository){
        this.employeeRepository = theEmployeeRepository;
    }

    //@Override
    //public List<Record> findAllRecords(){
    //    return employeeRepository.find 
    //}

    @Override
    public Employee save(Employee theEmployee){
        return employeeRepository.save(theEmployee);
    }
}
