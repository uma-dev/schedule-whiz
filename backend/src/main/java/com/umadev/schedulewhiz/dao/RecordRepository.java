package com.umadev.schedulewhiz.dao;

import com.umadev.schedulewhiz.entity.Record;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Integer> {

  List<Record> findByEmployeeId(Integer employeeId);

  List<Record> findByEmployeeEmail(String employeeEmail);
}
