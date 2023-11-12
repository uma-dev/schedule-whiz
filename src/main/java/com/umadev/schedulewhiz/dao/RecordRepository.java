package com.umadev.schedulewhiz.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Integer>  {

}
