package com.umadev.schedulewhiz.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Integer>  {

    List<Record> findByEmployeeId(Integer employeeId);
}
