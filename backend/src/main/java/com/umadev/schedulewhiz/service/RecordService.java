package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.entity.Record;
import java.util.List;

public interface RecordService {

  List<Record> findbyEmployeeId(Integer employeeId);

  List<Record> findbyEmployeeEmail(String employeeEmail);

  int findbyEmployeeEmailAndMonth(String employeeEmail, int month, int year);

  boolean isSavingRestrictedToday(Integer employeeId);

  boolean isPostedOutOfTime(Record record);

  boolean isPostedBeforeExpectedTime(Record record);

  Record saveRecord(Record theRecord);
}
