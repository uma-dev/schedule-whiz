package com.umadev.schedulewhiz.service;

import java.util.List;
import java.util.Optional;

import com.umadev.schedulewhiz.entity.Team;

public interface TeamService {
     
    List<Team> findAll();
    Optional<Team> findByName(String teamName); 
    Optional<Team> findById(Integer teamId); 
} 
