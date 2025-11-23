package com.agendafacil.backend.service;

import java.util.List;
import java.util.Map;

import com.agendafacil.backend.DTO.EmpresaDTO;
import com.agendafacil.backend.model.Empresa;
import com.agendafacil.backend.repository.EmpresaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmpresaService {
   
    private final EmpresaRepository empresaRepository;
    private final ConsultarCnpjAPI consultarCnpjAPI;

    public EmpresaDTO obterOuCadastrarEmpresaPorCNPJ(String cnpj){
        return empresaRepository.findByCnpj(cnpj)
            .map(EmpresaDTO::fromEntity)
            .orElseGet(() -> cadastrarNovaEmpresa(cnpj));
    }

    private EmpresaDTO cadastrarNovaEmpresa(String cnpj) {
        Map<String, Object> dados = consultarCnpjAPI.buscarCnpj(cnpj);

        String razaoSocial = (String) dados.get("razao_social");
        String nome = (String) dados.get("nome_fantasia");

        if(nome == null || nome.trim().isEmpty()){
            nome = razaoSocial;
        }

        Empresa empresa = Empresa.builder()
            .cnpj(cnpj)
            .razao_social(razaoSocial)
            .nome(nome)
            .telefone((String) dados.get("ddd_telefone_1"))
            .email((String) dados.get("email"))
            .build();

        empresaRepository.save(empresa);
        return EmpresaDTO.fromEntity(empresa);
    }

    public List<Empresa> findAll(){
        return empresaRepository.findAll();
    }

}
