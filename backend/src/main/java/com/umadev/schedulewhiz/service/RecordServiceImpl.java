package com.umadev.schedulewhiz.service;

import com.umadev.schedulewhiz.dao.RecordRepository;
import com.umadev.schedulewhiz.entity.Record;
import java.time.Duration;
import java.time.LocalDate;
import java.time.OffsetTime;
import java.time.ZoneOffset;
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
  public boolean isSavingRestricted(Integer employeeId) {
    Optional<Record> lastRecord =
        recordRepository.findTopByEmployeeIdOrderByStartTimeDesc(employeeId);

    if (lastRecord.isPresent()) {
      LocalDate lastPostDate = lastRecord.get().getStartTime().toLocalDate();
      LocalDate currentDate = LocalDate.now();
      boolean alreadyPosted = lastPostDate.isEqual(currentDate);

      OffsetTime startTime = lastRecord.get().getSchedule().getStartTime();
      // Add UTC -6 to the startTime in order to get correct durations
      startTime = startTime.withOffsetSameLocal(ZoneOffset.ofHours(-6));
      OffsetTime now = OffsetTime.now();
      int tolerance = 20; // minutes
      Duration delay = Duration.between(startTime, now);
      // If alreadyPosted a record today doesn't need to calculate the delay.
      boolean outOfTime = alreadyPosted ? false : delay.toMinutes() > tolerance;

      // User restricted to post
      return alreadyPosted || outOfTime;
    }
    // No previous post, no restricted today
    return false;
  }

  @Override
  public Record saveRecord(Record theRecord) {
    return recordRepository.save(theRecord);
  }
}
