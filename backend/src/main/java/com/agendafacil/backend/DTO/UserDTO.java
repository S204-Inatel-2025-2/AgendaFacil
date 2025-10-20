package com.agendafacil.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserDTO {
    private String nomeCompleto; // camelCase
    private String email;
    private String telefone;
    private String senha;
}