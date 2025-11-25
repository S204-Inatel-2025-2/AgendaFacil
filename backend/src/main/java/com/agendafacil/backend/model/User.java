package com.agendafacil.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome_completo;

    @Column(nullable = false, unique = true)
    private String email;

    private String telefone;
    private String senha;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String providerId;

    public User(String nome, String email, String telefone, String senha){
        this.nome_completo = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
        this.authProvider = AuthProvider.LOCAL;
    }

    public static User createOAuth2User(String name, String email, String providerId, AuthProvider provider) {
        User user = new User();
        user.setNome_completo(name);
        user.setEmail(email);
        user.setProviderId(providerId);

        user.setAuthProvider(provider);
        user.setSenha(null);
        return user;
    }
}