package com.umadev.schedulewhiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umadev.schedulewhiz.dao.RecordRepository;
import com.umadev.schedulewhiz.entity.Record;

@Service
public class RecordServiceImpl implements RecordService {

    private RecordRepository recordRepository;

    @Autowired
    public RecordServiceImpl( RecordRepository theRecordRepository){
        this.recordRepository = theRecordRepository;
    }

    @Override
    public List<Record> findbyEmployeeId(Integer recordId){
        return recordRepository.findByEmployeeId(recordId);
    }

    @Override 
    public Record saveRecord(Record theRecord){
        return recordRepository.save(theRecord); 
    }
} 
