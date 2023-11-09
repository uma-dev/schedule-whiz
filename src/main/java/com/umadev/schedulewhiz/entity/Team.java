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

@Table(name = "`Teams`")

public class Team {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    @Column(name="team_id")
    private Integer id;
    
    @Column(name="name")
    private String name;

}
