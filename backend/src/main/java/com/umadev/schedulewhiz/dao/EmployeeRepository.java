package com.umadev.schedulewhiz.dao;

import com.umadev.schedulewhiz.entity.Employee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

  Optional<Employee> findByEmail(String email);

  List<Employee> findByTeamId(Long teamId);
}
