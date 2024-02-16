package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.dao.RecordRepository;
import com.umadev.schedulewhiz.entity.Record;
import java.time.Duration;
import java.time.LocalDate;
import java.time.OffsetTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordServiceImpl implements RecordService {

  private RecordRepository recordRepository;

  @Autowired
  public RecordServiceImpl(RecordRepository theRecordRepository) {
    this.recordRepository = theRecordRepository;
  }

  @Override
  public List<Record> findbyEmployeeEmail(String employeeEmail) {
    return recordRepository.findByEmployeeEmail(employeeEmail);
  }

  @Override
  public int findbyEmployeeEmailAndMonth(String employeeEmail, int month, int year) {
    return recordRepository.findByEmployeeEmailAndMonth(employeeEmail, month, year);
  }

  @Override
  public List<Record> findbyEmployeeId(Integer recordId) {
    return recordRepository.findByEmployeeId(recordId);
  }

  @Override
  public boolean isSavingRestrictedToday(Integer employeeId) {
    Optional<Record> lastRecord =
        recordRepository.findTopByEmployeeIdOrderByStartTimeDesc(employeeId);
    // No previous post, no restricted today
    if (lastRecord.isEmpty()) {
      return false;
    }
    LocalDate lastPostDate = lastRecord.get().getStartTime().toLocalDate();
    LocalDate currentDate = LocalDate.now();
    return lastPostDate.isEqual(currentDate);
  }

  @Override
  public boolean isPostedOutOfTime(Record record) {
    OffsetTime postedTime = record.getStartTime().toOffsetTime();
    OffsetTime startTime = record.getSchedule().getStartTime();
    int tolerance = 60; // minutes
    return Duration.between(startTime, postedTime).toMinutes() > tolerance;
  }

  @Override
  public boolean isPostedBeforeExpectedTime(Record record) {
    OffsetTime postedTime = record.getStartTime().toOffsetTime();
    OffsetTime startTime = record.getSchedule().getStartTime();
    int tolerance = -60; // minutes
    // Try to post more than one hour after start time
    return Duration.between(startTime, postedTime).toMinutes() < tolerance;
  }

  @Override
  public Record saveRecord(Record theRecord) {
    return recordRepository.save(theRecord);
  }
}
