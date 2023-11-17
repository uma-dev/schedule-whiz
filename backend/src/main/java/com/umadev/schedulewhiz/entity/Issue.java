package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.CascadeType;
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

@Table(name = "`Issues`")

public class Issue {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="issue_id")
    private Integer id;
    
    // Does not need a delete cascade type operation, since statuses are independent
    // Unidirectional one to many 
    @ManyToOne( cascade={CascadeType.PERSIST, CascadeType.MERGE, 
                         CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name="fk_issue_status")
    private IssueStatus issueStatus;
    
    @Column(name="delay")
    private OffsetTime delay;

    @Column(name="description")
    private String description;
}
