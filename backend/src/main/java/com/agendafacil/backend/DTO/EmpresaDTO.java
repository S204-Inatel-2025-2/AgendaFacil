package com.agendafacil.backend.DTO;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class EmpresaDTO {
    // vai vir da propria criação da empresa
    private Long id; 

    // vai vir da consulta da api de cnpj
    private String nome;
    private String razao_social;
    private String telefone;

    // vai vir da entrada do usuario
    private String cnpj;
    private String email; // pode vir da api de cnpj também
    private String senha;
}