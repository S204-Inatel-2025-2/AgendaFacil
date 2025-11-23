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

    public EmpresaDTO consultaCnpj(String cnpj){
        cnpj = cnpj.replaceAll("[^0-9]", "");

        Map<String, Object> dados = consultarCnpjAPI.buscarCnpj(cnpj);
        String razaoSocial = (String) dados.get("razao_social");
        String nome = (String) dados.get("nome_fantasia");
        String email = (String) dados.get("email");
        String telefone = (String) dados.get("ddd_telefone_1");

        if(nome == null || nome.trim().isEmpty()){
            nome = razaoSocial;
        }

        EmpresaDTO dto = new EmpresaDTO();
        dto.setCnpj(cnpj);
        dto.setNome(nome);
        dto.setRazao_social(razaoSocial);
        dto.setTelefone(telefone);
        dto.setEmail(email != null ? email:"");

        return dto;
    }

    public EmpresaDTO obterOuCadastrarEmpresaPorCNPJ(String cnpj){
        return empresaRepository.findByCnpj(cnpj)
            .map(EmpresaDTO::fromEntity)
            .orElseGet(() -> cadastrarNovaEmpresa(cnpj));
    }

    private EmpresaDTO cadastrarNovaEmpresa(String cnpj) {
        Map<String, Object> dados = consultarCnpjAPI.buscarCnpj(cnpj);

        String razaoSocial = (String) dados.get("razao_social");
        String nome = (String) dados.get("nome_fantasia");
        String email = (String) dados.get("email");
        String telefone = (String) dados.get("ddd_telefone_1");
        String senha = "";// ainda não tá funcionando o cadastro até eu pensar num jeito de implementar isso
        if(nome == null || nome.trim().isEmpty()){
            nome = razaoSocial;
        }

        Empresa empresa = new Empresa(nome, razaoSocial, cnpj, email, telefone, senha);
        empresaRepository.save(empresa);
        return EmpresaDTO.fromEntity(empresa);
    }

    public List<Empresa> findAll(){
        return empresaRepository.findAll();
    }

}