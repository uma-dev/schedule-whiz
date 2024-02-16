package com.umadev.schedulewhiz.controller;

import com.umadev.schedulewhiz.entity.Record;
import com.umadev.schedulewhiz.service.RecordService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://192.168.3.110:5173")
public class RecordController {

  private RecordService recordService;

  @Autowired
  public RecordController(RecordService theRecordService) {
    this.recordService = theRecordService;
  }

  // Get records by employee id
  @GetMapping("/{employeeId}")
  public ResponseEntity<?> getRecordsbyEmployeeId(@PathVariable("employeeId") Integer employeeId) {
    try {
      if (employeeId <= 0) {
        return ResponseEntity.badRequest().body("Employee ID cannot be negative.");
      }
      List<Record> findedRecords = recordService.findbyEmployeeId(employeeId);
      return new ResponseEntity<>(findedRecords, HttpStatus.OK);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An unexpected error occurred.");
    }
  }

  @GetMapping("/search")
  public ResponseEntity<?> getRecordsbyEmployeeEmail(
      @RequestParam(name = "employeeEmail") String employeeEmail) {
    try {
      if (employeeEmail == null) {
        return ResponseEntity.badRequest().body("Employee email cannot be empty.");
      }
      List<Record> findedRecords = recordService.findbyEmployeeEmail(employeeEmail);
      return new ResponseEntity<>(findedRecords, HttpStatus.OK);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An unexpected error occurred.");
    }
  }

  @GetMapping("/searchbymonth")
  public ResponseEntity<?> getRecordsOfTheMonthbyEmployeeEmail(
      @RequestParam(name = "employeeEmail") String employeeEmail,
      @RequestParam(name = "month") int month,
      @RequestParam(name = "year") int year) {
    try {
      if (employeeEmail == null) {
        return ResponseEntity.badRequest().body("Employee email cannot be empty.");
      }
      if (month < 1 || month > 12) {
        return ResponseEntity.badRequest().body("Month invalid.");
      }
      int findedRecordsOfTheMonth =
          recordService.findbyEmployeeEmailAndMonth(employeeEmail, month, year);
      return new ResponseEntity<>(findedRecordsOfTheMonth, HttpStatus.OK);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("An unexpected error occurred.");
    }
  }

  // Post (save) a new record
  @PostMapping
  public ResponseEntity<?> saveRecord(@RequestBody Record theRecord) {
    try {
      Integer id = theRecord.getEmployee().getId();

      // Is the user posting only once a day?
      if (recordService.isSavingRestrictedToday(id)) {
        return new ResponseEntity<>("You can only post once a day", HttpStatus.BAD_REQUEST);
      }

      // Is the user posting within time?
      if (recordService.isPostedOutOfTime(theRecord)) {
        return new ResponseEntity<>(
            "You can only post up to 60 minutes after your start time", HttpStatus.BAD_REQUEST);
      }

      // Is the user posting before expected?
      if (recordService.isPostedBeforeExpectedTime(theRecord)) {
        return new ResponseEntity<>(
            "You can only post up to 60 minutes earlier than your start time",
            HttpStatus.BAD_REQUEST);
      }

      // If the employee can post a record today:
      // Set the ID to zero/0 just in case it's different in the JSON.
      theRecord.setId(0);
      Record savedRecord = recordService.saveRecord(theRecord);
      return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
