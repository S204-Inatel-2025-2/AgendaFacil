package com.agendafacil.backend.repository;

import com.agendafacil.backend.model.AuthProvider;
import com.agendafacil.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderId(String providerId);
    Optional<User> findByEmailAndAuthProvider(String email, AuthProvider authProvider);
}