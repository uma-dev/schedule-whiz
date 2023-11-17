package com.umadev.schedulewhiz.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>  {

}
