package com.umadev.schedulewhiz.security.auth;

import com.umadev.schedulewhiz.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String names;
  private String firstSurname;
  private String secondSurname;
  private String email;
  private String password;
  private Role role;
}
