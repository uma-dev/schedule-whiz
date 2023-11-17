package com.umadev.schedulewhiz.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umadev.schedulewhiz.entity.Team;
import com.umadev.schedulewhiz.service.TeamService;

@RestController
@RequestMapping("/api/teams")
public class TeamController { 

    private TeamService teamService;

    @Autowired
    public TeamController (TeamService theTeamService){
        this.teamService = theTeamService;
    }

    @GetMapping
    public ResponseEntity<List<Team>> findAll(){
        return ResponseEntity.ok(teamService.findAll()); 
    } 

    @GetMapping("/{teamName}")
    public ResponseEntity<Team> findByName(@PathVariable("teamName") String teamName){
        Optional<Team> teamFinded = teamService.findByName(teamName);
        if( teamFinded.isPresent() ){
          return ResponseEntity.ok( teamFinded.get() );
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } 
}

