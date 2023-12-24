package com.umadev.schedulewhiz.security.token;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

  @Query(
      value =
          """
      select t from Token t inner join Employee e
      on t.employee.id = e.id
      where e.id = :id and (t.expired = false or t.revoked = false)
      """)
  List<Token> findAllValidTokenByUser(Integer id);

  Optional<Token> findByToken(String token);
}
