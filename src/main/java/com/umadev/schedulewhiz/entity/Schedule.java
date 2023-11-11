package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.time.OffsetTime;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

@Table(name =  "`Schedules`")

public class Schedule {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="schedule_id")
    private Integer id;
    
    @Column(name="name")
    private String name;

    @Column(name="start_time")
    private OffsetTime startTime;

    @Column(name="end_time")
    private OffsetTime endTime;

    @Column(name="max_employees")
    private Integer maxEmployees;
   
    @Column(name="current_employees")
    private Integer currentEmployees;
}
