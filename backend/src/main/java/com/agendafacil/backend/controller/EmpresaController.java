package com.agendafacil.backend.controller;

import com.agendafacil.backend.DTO.EmpresaDTO;
import com.agendafacil.backend.DTO.LoginDTO;
import com.agendafacil.backend.service.EmpresaService;
import com.agendafacil.backend.model.Empresa;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empresas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmpresaController {
    
    private final EmpresaService empresaService;

    @GetMapping("/cnpj/{cnpj}")
    public EmpresaDTO buscarPorCnpj(@PathVariable String cnpj) {
        return empresaService.consultaCnpj(cnpj);
    }

    @PostMapping("/cadastrar")
    public Empresa cadastrarEmpresa(@RequestBody EmpresaDTO empresaDTO) throws Exception{
        return empresaService.cadastrarEmpresa(empresaDTO);
    }

    @PostMapping("/login")
    public Empresa loginEmpresa(@RequestBody LoginDTO loginDTO) throws Exception{
        return empresaService.loginEmpresa(loginDTO.getEmail(), loginDTO.getSenha());
    }

    @GetMapping
    public List<Empresa> getAllEmpresas(){
        return empresaService.findAll();
    }

    @GetMapping("/{id}")
    public Empresa buscarPorId(@PathVariable Long id) {
    return empresaService.findById(id);
}

}