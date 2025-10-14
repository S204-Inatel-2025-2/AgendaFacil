package com.agendafacil.backend.controller;

import com.agendafacil.backend.DTO.EmpresaDTO;
import com.agendafacil.backend.service.EmpresaService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmpresaController {
    
    private final EmpresaService empresaService;

    @GetMapping("/cnpj/{cnpj}")
    public EmpresaDTO buscarPorCnpj(@PathVariable String cnpj) {
        return empresaService.obterOuCadastrarEmpresaPorCNPJ(cnpj);
    }

}
