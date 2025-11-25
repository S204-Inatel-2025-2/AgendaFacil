package com.agendafacil.backend.controller;

import com.agendafacil.backend.model.AuthProvider;
import com.agendafacil.backend.model.User;
import com.agendafacil.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/oauth2")
public class OAuth2LoginController {

    @Autowired
    private UserService userService;

    @Value("${app.oauth2.redirect-url:http://localhost:3000}")
    private String redirectUrl;

    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.ok(Collections.singletonMap("authenticated", false));
        }

        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");
        String providerId = principal.getAttribute("sub");

        // Processar usuário OAuth2
        User user = userService.processOAuth2User(email, name, providerId, AuthProvider.GOOGLE);

        Map<String, Object> userInfo = Map.of(
                "authenticated", true,
                "id", user.getId(),
                "name", user.getNomeCompleto(),
                "email", user.getEmail(),
                "provider", user.getAuthProvider().name()
        );

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/login-success")
    public ResponseEntity<?> loginSuccess(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            String email = principal.getAttribute("email");
            String name = principal.getAttribute("name");
            String providerId = principal.getAttribute("sub");

            User user = userService.processOAuth2User(email, name, providerId, AuthProvider.GOOGLE);

            // Retorna informações do usuário para o frontend
            Map<String, Object> response = Map.of(
                    "success", true,
                    "message", "Login realizado com sucesso",
                    "user", Map.of(
                            "id", user.getId(),
                            "nome_completo", user.getNomeCompleto(),
                            "email", user.getEmail(),
                            "auth_provider", user.getAuthProvider()
                    ),
                    "redirectUrl", redirectUrl
            );

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(
                Map.of("success", false, "message", "Falha no login")
        );
    }

    // Add this endpoint to check authentication status
    @GetMapping("/status")
    public ResponseEntity<?> getAuthStatus(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.ok(Collections.singletonMap("authenticated", false));
        }
        
        String email = principal.getAttribute("email");
        User user = userService.findByEmail(email).orElse(null);
        
        if (user != null) {
            Map<String, Object> userInfo = Map.of(
                    "authenticated", true,
                    "id", user.getId(),
                    "name", user.getNomeCompleto(),
                    "email", user.getEmail(),
                    "provider", user.getAuthProvider().name()
            );
            return ResponseEntity.ok(userInfo);
        }
        
        return ResponseEntity.ok(Collections.singletonMap("authenticated", false));
    }
}