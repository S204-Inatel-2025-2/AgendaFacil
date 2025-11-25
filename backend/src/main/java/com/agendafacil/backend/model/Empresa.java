package com.agendafacil.backend.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Entity
@Data
@Getter
@Setter
@Table(name = "empresas")
public class Empresa {

    private @Id @GeneratedValue Long id;

    @Column(nullable = false, unique = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String razao_social;
    private String cnpj;
    private String email;
    private String telefone;
    private String senha;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Servico> servicos = new ArrayList<>();

    public Empresa(){}

    public Empresa(String nome, String razao_social, String cnpj, String email, String telefone, String senha){
        this.nome = nome;
        this.razao_social = razao_social;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}