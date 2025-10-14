package com.agendafacil.backend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "servicos")
public class Servico {
    private @Id @GeneratedValue Long id;

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

    public Servico(){}

    public Servico(String nome, String categoria, String descricao, int duracao_minutos, BigDecimal preco){
        this.nome = nome;
        this.categoria = categoria;
        this.descricao = descricao;
        this.duracao_minutos = duracao_minutos;
        this.preco = preco;
    }
}
