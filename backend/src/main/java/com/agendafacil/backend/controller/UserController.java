package com.agendafacil.backend.controller;

import com.agendafacil.backend.DTO.LoginDTO;
import com.agendafacil.backend.DTO.UserDTO;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.service.UserService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody UserDTO userDTO) throws Exception {
        User user = new User(userDTO.getNome_completo(),userDTO.getEmail(),userDTO.getTelefone(), userDTO.getSenha());
        return userService.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDTO loginDTO) throws Exception {
        return userService.login(loginDTO.getEmail(),loginDTO.getSenha());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    // Endpoint para obter a URL de OAuth2 (útil para o frontend)
    @GetMapping("/auth/oauth-urls")
    public ResponseEntity<?> getOAuthUrls() {
        return ResponseEntity.ok().body(Map.of(
                "google", "/oauth2/authorization/google"
        ));
    }

    // Endpoint para debug - mostra informações do usuário atual
    @GetMapping("/auth/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Não autenticado");
        }
        return ResponseEntity.ok().body(principal.getAttributes());
    }
}