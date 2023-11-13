package com.umadev.schedulewhiz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umadev.schedulewhiz.entity.Record;
import com.umadev.schedulewhiz.service.RecordService;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    private RecordService recordService;

    @Autowired 
    public RecordController(RecordService theRecordService){
        this.recordService = theRecordService;
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Record>> getRecordsbyEmployeeId(@PathVariable("employeeId") Integer employeeId){
        List<Record> findedRecords = recordService.findbyEmployeeId(employeeId);
        
        return new ResponseEntity<>(findedRecords, HttpStatus.FOUND); 
    }


}
