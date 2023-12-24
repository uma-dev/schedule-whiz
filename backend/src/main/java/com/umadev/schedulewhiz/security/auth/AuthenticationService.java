package com.umadev.schedulewhiz.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.umadev.schedulewhiz.dao.EmployeeRepository;
import com.umadev.schedulewhiz.entity.Employee;
import com.umadev.schedulewhiz.security.config.JwtService;
import com.umadev.schedulewhiz.security.token.Token;
import com.umadev.schedulewhiz.security.token.TokenRepository;
import com.umadev.schedulewhiz.security.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
// @RequiredArgsConstructor
public class AuthenticationService {

  private EmployeeRepository repository;
  private TokenRepository tokenRepository;
  private PasswordEncoder passwordEncoder;
  private JwtService jwtService;
  private AuthenticationManager authenticationManager;

  @Autowired
  public AuthenticationService(
      EmployeeRepository theEmployeeRepo,
      TokenRepository theTokenRepo,
      PasswordEncoder thePasswordEncoder,
      JwtService theJwtservice,
      AuthenticationManager theAuthenticationManager) {
    this.repository = theEmployeeRepo;
    this.tokenRepository = theTokenRepo;
    this.passwordEncoder = thePasswordEncoder;
    this.jwtService = theJwtservice;
    this.authenticationManager = theAuthenticationManager;
  }

  public AuthenticationResponse register(RegisterRequest request) {
    Employee user =
        Employee.builder()
            .names(request.getNames())
            .firstSurname(request.getFirstSurname())
            .secondSurname(request.getSecondSurname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .team(request.getTeam())
            .build();

    Employee savedUser = repository.save(user);
    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    Employee user = repository.findByEmail(request.getEmail()).orElseThrow();
    String jwtToken = jwtService.generateToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
        .refreshToken(refreshToken)
        .build();
  }

  @Override
  public String toString() {
    return "AuthenticationService []";
  }

  private void saveUserToken(Employee user, String jwtToken) {
    Token token =
        Token.builder()
            .employee(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(Employee user) {
    List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty()) {
      return;
    }
    // Set expired and revoked to true for old tokens
    validUserTokens.forEach(
        token -> {
          token.setExpired(true);
          token.setRevoked(true);
        });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      Employee user = this.repository.findByEmail(userEmail).orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        String accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        AuthenticationResponse authResponse =
            AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
