package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.*;
import java.time.OffsetDateTime; 


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Table(name = "Records", schema = "schedule-whiz-v1")

public class Record {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="record_id")
    private Integer id;

    @Column(name="employee")
    private Employee employee;

    @Column(name="start_time")
    private OffsetDateTime startTime;
    
    @Column(name="end_time")
    private OffsetDateTime endTime;


}
