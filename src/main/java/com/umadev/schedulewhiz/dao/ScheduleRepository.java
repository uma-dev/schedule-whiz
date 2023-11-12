package com.umadev.schedulewhiz.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer>  {

}
