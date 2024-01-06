package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.entity.Record;
import java.util.List;

public interface RecordService {

  List<Record> findbyEmployeeId(Integer employeeId);

  List<Record> findbyEmployeeEmail(String employeeEmail);

  Record saveRecord(Record theRecord);
}
