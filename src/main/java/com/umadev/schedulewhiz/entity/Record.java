package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@ToString

@Table(name = "`Records`") 

public class Record {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="record_id")
    private Integer id;

    // Bidirectional relationship
    @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name="fk_employee")
    private Employee employee;

    // Unidirectional relationship
    @OneToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "fk_schedule")
    private Schedule schedule;

    // Unidirectional relationship  
    @OneToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "fk_issue")
    private Issue issue;
    
    @Column(name="created")
    private OffsetDateTime startTime;
}

