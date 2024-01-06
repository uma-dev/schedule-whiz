package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.dao.EmployeeRepository;
import com.umadev.schedulewhiz.entity.Employee;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository theEmployeeRepository) {
    this.employeeRepository = theEmployeeRepository;
  }

  // @Override
  // public List<Record> findAllRecords(){
  //    return employeeRepository.find
  // }

  @Override
  public Employee save(Employee theEmployee) {
    return employeeRepository.save(theEmployee);
  }

  @Override
  public Optional<Employee> findByEmail(String theEmail) {
    return employeeRepository.findByEmail(theEmail);
  }

  @Override
  public Optional<Employee> getEmployeeById(Integer theId) {
    return employeeRepository.findById(theId);
  }
}
