package com.umadev.schedulewhiz.controller;

import com.umadev.schedulewhiz.entity.Issue;
import com.umadev.schedulewhiz.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://192.168.3.110:5173")
public class IssueController {

  private IssueService issueService;

  @Autowired
  public IssueController(IssueService theIssueService) {
    this.issueService = theIssueService;
  }

  @PostMapping
  public ResponseEntity<Issue> saveIssue(@RequestBody Issue theIssue) {
    try {
      theIssue.setId(0);
      Issue savedIssue = issueService.save(theIssue);
      return new ResponseEntity<>(savedIssue, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }
}
