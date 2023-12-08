package com.umadev.schedulewhiz.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/search")
    public ResponseEntity<?> findByName(@RequestParam(name = "name") String team){
        try{
            if(team == null)
                return ResponseEntity.badRequest().body("Team name cannot be empty."); 
            Optional<Team> findedTeam = teamService.findByName(team);
            if( findedTeam.isEmpty() )
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Team not found.");
            return new ResponseEntity<>(findedTeam, HttpStatus.OK);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    } 
    
    @GetMapping("/{teamId}")
    public ResponseEntity<?> findById(@PathVariable("teamId") Integer theId){
        try{
            if(theId <= 0)
                return ResponseEntity.badRequest().body("Team ID cannot be negative."); 
            Optional<Team> findedTeam = teamService.findById(theId);
            if( findedTeam.isEmpty() )
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Team not found.");
            return new ResponseEntity<>(findedTeam, HttpStatus.OK);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

}

