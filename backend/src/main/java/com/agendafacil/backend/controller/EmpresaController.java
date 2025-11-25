package com.agendafacil.backend.controller;

import com.agendafacil.backend.DTO.EmpresaDTO;
import com.agendafacil.backend.DTO.LoginDTO;
import com.agendafacil.backend.service.EmpresaService;
import com.agendafacil.backend.model.Empresa;

import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.HashMap;
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
    public Map<String, Object> buscarPorId(@PathVariable Long id, @RequestHeader(value = "empresa-logada-id", required = false) Long empresaLogadaId) {
        Empresa empresa = empresaService.findById(id);
        boolean modoPrestador = empresaService.isEmpresaLogada(id, empresaLogadaId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("empresa", empresa);
        response.put("modoPrestador", modoPrestador);
        
        return response;
    }

    @GetMapping("/{id}/modo-prestador")
    public boolean verificarModoPrestador(@PathVariable Long id, @RequestHeader("empresa-logada-id") Long empresaLogadaId) {
        return empresaService.isEmpresaLogada(id, empresaLogadaId);
    }
}