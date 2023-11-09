package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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

@Table(name = "`Records`") 

public class Record {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="record_id")
    private Integer id;

    //@Column(name="employee")
    //private Employee employee;

    @Column(name="created")
    private OffsetDateTime startTime;
   
    // All operations aplied to employee will cascade with schedule 
   /* @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    // All operations aplied to employee will cascade with issue 
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "schedule_id")
    @JoinColumn(name = "issue_id")
    private Issue issue;
    */
}
