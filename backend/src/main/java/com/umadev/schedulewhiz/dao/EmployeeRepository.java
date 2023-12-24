package com.umadev.schedulewhiz.dao;

import com.umadev.schedulewhiz.entity.Employee;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

  Optional<Employee> findByEmail(String email);
}
