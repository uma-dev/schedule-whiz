package com.umadev.schedulewhiz.controller;

import com.umadev.schedulewhiz.security.auth.AuthenticationRequest;
import com.umadev.schedulewhiz.security.auth.AuthenticationResponse;
import com.umadev.schedulewhiz.security.auth.AuthenticationService;
import com.umadev.schedulewhiz.security.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

  private AuthenticationService authenticationService;

  @Autowired
  public LoginController(AuthenticationService theService) {
    this.authenticationService = theService;
  }

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authenticationService.register(request));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(authenticationService.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    authenticationService.refreshToken(request, response);
  }
}
