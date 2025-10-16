package com.agendafacil.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.agendafacil.backend.config.JwtTokenProvider;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public User register(User user) throws Exception{
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new Exception("Email já cadastrado!");
        }
        return userRepository.save(user);
    }

    public User login(String email, String senha) throws Exception{
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getSenha().equals(senha)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }

        return userOpt.get();
    }

    public ResponseEntity<?> processOAuth2User(OAuth2User oauth2User) {
        System.out.println("=== PROCESSING OAUTH2 USER ===");

        if (oauth2User == null) {
            return ResponseEntity.badRequest().body("Dados do usuário OAuth2 não disponíveis");
        }

        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        System.out.println("Email from OAuth2: " + email);
        System.out.println("Name from OAuth2: " + name);

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email não encontrado nos dados do OAuth2");
        }

        if (name == null || name.trim().isEmpty()) {
            name = "Usuário Google";
        }

        Optional<User> userOpt = userRepository.findByEmail(email);

        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
            System.out.println("Usuário encontrado (LOGIN): " + user.getEmail());
        } else {
            // Cria novo usuário para REGISTRO
            user = new User(name, email, "", "oauth2_user");
            user = userRepository.save(user);
            System.out.println("Novo usuário criado (REGISTRO): " + user.getEmail());
        }

        String token = jwtTokenProvider.gerarToken(email);
        System.out.println("Token JWT gerado: " + token);

        return ResponseEntity.ok().body(java.util.Map.of(
                "token", token,
                "user", user
        ));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

}