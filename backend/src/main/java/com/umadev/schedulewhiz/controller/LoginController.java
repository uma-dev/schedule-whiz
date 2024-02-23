package com.umadev.schedulewhiz.controller;

import com.umadev.schedulewhiz.security.auth.AuthenticationRequest;
import com.umadev.schedulewhiz.security.auth.AuthenticationResponse;
import com.umadev.schedulewhiz.security.auth.AuthenticationService;
import com.umadev.schedulewhiz.security.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    allowCredentials = "true",
    origins = "http://192.168.3.110:5173",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class LoginController {

  private AuthenticationService service;

  @Autowired
  public LoginController(AuthenticationService theService) {
    this.service = theService;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    System.out.println("  The request");
    System.out.println(request.getHeader(HttpHeaders.AUTHORIZATION));
    service.refreshToken(request, response);
  }
}
