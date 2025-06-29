package com.finalproject.biyahero.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.finalproject.biyahero.Entity.UserEntity;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
     Optional<UserEntity> findByUsername(String username);
}
