package com.agendafacil.backend.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "servicos")
public class Servico {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, length = 100)
    private String categoria;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private int duracao_minutos;

    @Column(nullable = false)
    private BigDecimal preco;

    @Column(nullable = false)
    private boolean agendado = false;

    @ManyToOne
    @JoinColumn(name = "usuario_agendado_id")
    private User usuarioAgendado;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    @JsonBackReference
    private Empresa empresa;

    public Servico(){}

    public Servico(String nome, String categoria, String descricao, int duracao_minutos, BigDecimal preco){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.duracao_minutos = duracao_minutos;
        this.preco = preco;
    }

    public Servico(String nome, String categoria, String descricao, int duracao_minutos, BigDecimal preco, Empresa empresa){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.duracao_minutos = duracao_minutos;
        this.preco = preco;
        this.empresa = empresa;
    }
}
