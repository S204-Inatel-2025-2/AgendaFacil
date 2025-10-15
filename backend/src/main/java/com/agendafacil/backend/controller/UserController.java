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

    @GetMapping("/oauth2/success")
    public ResponseEntity<?> oauth2Success(Authentication authentication) {
        System.out.println("=== DEBUG OAUTH2 ===");
        System.out.println("Authentication: " + authentication);
        System.out.println("Authentication type: " + (authentication != null ? authentication.getClass().getName() : "NULL"));

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
            System.out.println("OAuth2 Token: " + oauthToken);

            OAuth2User oauth2User = oauthToken.getPrincipal();
            System.out.println("OAuth2 User: " + oauth2User);

            if (oauth2User != null) {
                System.out.println("User Attributes: " + oauth2User.getAttributes());
                return userService.processOAuth2User(oauth2User);
            } else {
                System.out.println("OAuth2User é NULL!");
            }
        } else {
            System.out.println("Authentication NÃO é OAuth2AuthenticationToken");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Autenticação OAuth2 falhou");
    }
}