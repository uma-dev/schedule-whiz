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

@Table(name = "`Issues`")

public class Issue {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="issue_id")
    private Integer id;
    
    /*
    @Column(name="issue_status")
    private IssueStatus issueStatus;
    */
    
    @Column(name="delay")
    private String delay;

    @Column(name="description")
    private String description;
}
