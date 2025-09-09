package com.agendafacil.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Table(name = "users")
public class User {
    private @Id @GeneratedValue Long id;
    private String nome_completo;

    @Column(nullable = false, unique = true)
    private String email;
    private String telefone;
    private String senha;

    public User(){}

    public User(String nome, String email, String telefone, String senha){
        this.nome_completo = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}