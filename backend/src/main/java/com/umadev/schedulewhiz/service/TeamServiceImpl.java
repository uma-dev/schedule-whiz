package com.umadev.schedulewhiz.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umadev.schedulewhiz.dao.TeamRepository;
import com.umadev.schedulewhiz.entity.Team;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamServiceImpl( TeamRepository theTeamRepository){
        this.teamRepository = theTeamRepository;
    }

    @Override
    public List<Team> findAll(){
        return teamRepository.findAll();
    }

    @Override 
    public Optional<Team> findByName(String teamName){
        return teamRepository.findByName(teamName);
    }
}
