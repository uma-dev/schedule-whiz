package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
// Table name inside characters ` because of upper case table names defined
// in DDL script
@Table(name = "`Employees`")
public class Employee implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "employee_id")
  private Integer id;

  @Column(name = "names")
  private String names;

  @Column(name = "first_surname")
  private String firstSurname;

  @Column(name = "second_surname")
  private String secondSurname;

  @Column(name = "email")
  private String email;

  @Column(name = "image_url")
  private String imageUrl;

  @Column(name = "password", columnDefinition = "bpchar(68)", nullable = false)
  private String password;

  // Unidirectional one to many
  @ManyToOne
  @JoinColumn(name = "fk_schedule")
  @ToString.Exclude
  private Schedule schedule;

  // Bidirectional one to many
  @ManyToOne
  @JoinColumn(name = "fk_team")
  // @ToString.Exclude
  private Team team;

  // Unidirectional one to one
  @OneToOne
  @JoinColumn(name = "fk_managed_team")
  @ToString.Exclude
  private Team managedTeam;

  @Enumerated(EnumType.STRING)
  @Column(name = "role")
  private Role role;

  // @OneToMany(mappedBy = "employee")
  // private ListToken tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
