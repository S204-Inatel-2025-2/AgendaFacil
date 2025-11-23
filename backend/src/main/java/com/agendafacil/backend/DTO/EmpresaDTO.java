package com.agendafacil.backend.DTO;

import com.agendafacil.backend.model.Empresa;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public class EmpresaDTO {
    
    private Long id;
    private String nome;
    private String cnpj;
    private String razao_social;
    private String email;
    private String telefone;

    @JsonIgnore
    private Boolean tem_email_api;

    public static EmpresaDTO fromEntity(Empresa empresa) {
        EmpresaDTO dto = new EmpresaDTO();
        dto.setId(empresa.getId());
        dto.setNome(empresa.getNome());
        dto.setCnpj(empresa.getCnpj());
        dto.setRazao_social(empresa.getRazao_social());
        dto.setEmail(empresa.getEmail());
        dto.setTelefone(empresa.getTelefone());

        return dto;
    }

}