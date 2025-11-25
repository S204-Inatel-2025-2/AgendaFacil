package com.agendafacil.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserDTO {
    private String nome_completo; 
    private String email;
    private String telefone;
    private String senha;
}