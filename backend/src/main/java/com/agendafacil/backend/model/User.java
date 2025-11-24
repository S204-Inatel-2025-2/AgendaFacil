package com.agendafacil.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class User {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
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