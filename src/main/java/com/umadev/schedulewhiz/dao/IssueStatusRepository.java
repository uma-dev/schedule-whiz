package com.umadev.schedulewhiz.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umadev.schedulewhiz.entity.IssueStatus;

public interface IssueStatusRepository extends JpaRepository<IssueStatus, Integer>  {

}
