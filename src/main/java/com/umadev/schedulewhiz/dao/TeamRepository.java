package com.umadev.schedulewhiz.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Integer>  {
    Optional<Team> findByName(String teamName);
}
