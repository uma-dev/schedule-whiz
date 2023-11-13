package com.umadev.schedulewhiz.service;

import java.util.List;

import com.umadev.schedulewhiz.entity.Record;


public interface RecordService {

    List<Record> findbyEmployeeId(Integer employeeId);
}
