package com.umadev.schedulewhiz.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umadev.schedulewhiz.entity.Employee;
import com.umadev.schedulewhiz.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://192.168.3.110:5173")
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService theEmployeeService){
        this.employeeService = theEmployeeService;
    }

    // Save method (POST mapping)
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee theEmployee){
        try{
            if(theEmployee == null){
                return ResponseEntity.badRequest().body("Employee data is missing."); 
            }

            Employee savedEmployee = employeeService.save(theEmployee);
            if(savedEmployee == null){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save the employee.");
            }
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
   }

   @GetMapping("/{employeeId}")
    public ResponseEntity<?> findById(@PathVariable("employeeId") Integer theId){
        try{
            if(theId <= 0){
                return ResponseEntity.badRequest().body("Employee ID cannot be negative."); 
            }
            Optional<Employee> findedEmployee = employeeService.getEmployeeById(theId);
            if( findedEmployee.isEmpty() ){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee not found.");
            }
            return new ResponseEntity<>(findedEmployee, HttpStatus.OK);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

}
