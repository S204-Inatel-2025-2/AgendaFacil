package com.agendafacil.backend.DTO;

import java.math.BigDecimal;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ServiceDTO {
    
    private String nome;
    private String categoria;
    private String descricao;
    private int duracao_minutos;
    private BigDecimal preco;

}
