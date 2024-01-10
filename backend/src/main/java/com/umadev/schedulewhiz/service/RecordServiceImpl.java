package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.dao.RecordRepository;
import com.umadev.schedulewhiz.entity.Record;
import java.time.LocalDate;
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
  public List<Record> findbyEmployeeId(Integer recordId) {
    return recordRepository.findByEmployeeId(recordId);
  }

  @Override
  public boolean canUserSaveRecordToday(Integer employeeId) {
    Optional<Record> lastRecord =
        recordRepository.findTopByEmployeeIdOrderByStartTimeDesc(employeeId);

    if (lastRecord.isPresent()) {
      LocalDate lastPostDate = lastRecord.get().getStartTime().toLocalDate();
      LocalDate currentDate = LocalDate.now();
      // Last record is not saved today
      return !lastPostDate.isEqual(currentDate);
    }

    // No previous post, allow the user to post
    return true;
  }

  @Override
  public Record saveRecord(Record theRecord) {
    return recordRepository.save(theRecord);
  }
}
