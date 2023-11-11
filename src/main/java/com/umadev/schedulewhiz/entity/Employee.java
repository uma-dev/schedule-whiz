package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.CascadeType;
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

    // Unidirectional one to many
    @ManyToOne( cascade={CascadeType.PERSIST, CascadeType.MERGE,
                         CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name="fk_schedule")
    @ToString.Exclude   
    private Schedule schedule;
    
    // Bidirectional one to many
    @ManyToOne( cascade={CascadeType.PERSIST, CascadeType.MERGE,
                         CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name="fk_team")
    @ToString.Exclude   
    private Team team;
  
    // Unidirectional one to one
    @OneToOne( cascade={CascadeType.PERSIST, CascadeType.MERGE, 
                         CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name="fk_managed_team")
    @ToString.Exclude   
    private Team managedTeam;
}
