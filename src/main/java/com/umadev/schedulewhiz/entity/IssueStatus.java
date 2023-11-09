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

@Table(name = "`Issue_statuses`")

public class IssueStatus {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="issue_status_id")
    private Integer id;
    
    @Column(name="name")
    private String name;

}
