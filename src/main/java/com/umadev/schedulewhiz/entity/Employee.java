package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Table(name = "Employees", schema = "schedule-whiz-v1")

public class Employee {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="employee_id")
    private Integer id;
    
    @Column(name="names")
    private String names;

    @Column(name="first_surname")
    private String firstSurname;

    @Column(name="second_surname")
    private String secondSurname;

    //private Schedule schedule;
    //private Team team;
    //private Team managedTeam;
}
