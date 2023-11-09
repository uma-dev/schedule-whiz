package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

// Table name inside characters ` because of upper case table names defined 
// in DDL script 
@Table(name = "`Employees`")

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

    /*
    @Column(name="schedule")
    private Schedule schedule;
    
    @Column(name="team")
    private Team team;
   
    @Column(name="managed_team")
    private Team managedTeam;
    */
}
