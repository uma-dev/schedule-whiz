package com.umadev.schedulewhiz.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Collection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

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
  @ToString.Exclude
  private Team team;

  // Unidirectional one to one
  @OneToOne
  @JoinColumn(name = "fk_managed_team")
  @ToString.Exclude
  private Team managedTeam;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
  }

  @Override
  public String getPassword() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
  }

  @Override
  public String getUsername() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
  }

  @Override
  public boolean isAccountNonExpired() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
  }

  @Override
  public boolean isAccountNonLocked() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
  }

  @Override
  public boolean isCredentialsNonExpired() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
  }

  @Override
  public boolean isEnabled() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
  }
}
