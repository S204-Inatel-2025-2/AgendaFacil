package com.agendafacil.backend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.agendafacil.backend.DTO.EmpresaDTO;
import com.agendafacil.backend.model.Empresa;
import com.agendafacil.backend.repository.EmpresaRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        dto.setEmail(email != null ? email:""); // se o email for nulo deixa o email vazio

        return dto;
    }

    public Empresa cadastrarEmpresa(EmpresaDTO empresaDTO) throws Exception{
        String cnpj = empresaDTO.getCnpj().replaceAll("[^0-9]", "");

        if(empresaRepository.findByCnpj(cnpj).isPresent()){
            throw new Exception("CNPJ já cadastrado!");
        }

        Empresa empresa = new Empresa(
            empresaDTO.getNome(),
            empresaDTO.getRazao_social(),
            cnpj,
            empresaDTO.getEmail(),
            empresaDTO.getTelefone(),
            empresaDTO.getSenha()
        );

        empresaRepository.save(empresa);
        return empresa;
    }

    public Empresa loginEmpresa (String email, String senha){
        Optional<Empresa> empresaOpt = empresaRepository.findByEmail(email);

        if(empresaOpt.isEmpty() || !empresaOpt.get().getSenha().equals(senha)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha incorretos!");
        }
        return empresaOpt.get();
    }

    public List<Empresa> findAll(){
        return empresaRepository.findAll();
    }

    public Empresa findById(Long id){
        Empresa empresa = empresaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
        
        // Força o carregamento dos serviços (inicializa a coleção lazy)
        empresa.getServicos().size();
        
        return empresa;
    }
}