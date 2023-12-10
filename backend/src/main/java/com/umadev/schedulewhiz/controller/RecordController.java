package com.umadev.schedulewhiz.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.umadev.schedulewhiz.entity.Record;
import com.umadev.schedulewhiz.service.RecordService;

@RestController
@RequestMapping("/api/records")
@CrossOrigin(origins = "http://192.168.3.110:5173")
public class RecordController {

    private RecordService recordService;

    @Autowired 
    public RecordController(RecordService theRecordService){
        this.recordService = theRecordService;
    }

    // Get records by employee id 
    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Record>> getRecordsbyEmployeeId(@PathVariable("employeeId") Integer employeeId){
        List<Record> findedRecords = recordService.findbyEmployeeId(employeeId);
        
        return new ResponseEntity<>(findedRecords, HttpStatus.OK); 
    }

    // Post (save) a new record
    @PostMapping
    public ResponseEntity<Record> saveRecord(@RequestBody Record theRecord){
        try{
            //Set the ID to zero/0 just in case it's different in the JSON.
            //ID == 0 will create a new Record 
            theRecord.setId(0);
            Record savedRecord = recordService.saveRecord(theRecord);
            return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
