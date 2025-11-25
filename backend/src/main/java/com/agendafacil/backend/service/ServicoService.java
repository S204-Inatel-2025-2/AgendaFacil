package com.agendafacil.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.agendafacil.backend.model.Servico;
import com.agendafacil.backend.repository.ServicoRepository;
import com.agendafacil.backend.model.Empresa;
import com.agendafacil.backend.repository.EmpresaRepository;

import com.agendafacil.backend.model.User;

@Service
public class ServicoService {
    @Autowired
    private ServicoRepository servicoRepository;
    
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private UserService userService;



    public Servico cadastrar(Servico servico, Long empresaId){
        if(empresaId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Empresa não autenticada");
        }

        Empresa empresa = empresaRepository.findById(empresaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada!"));    

        servico.setEmpresa(empresa);
        return servicoRepository.save(servico);
    }

    public Servico findByNome(String nome){
        return servicoRepository.findByNome(nome)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum servico encontrado com esse nome!"));
    }

    public List<Servico> findByCategoria(String categoria){
        return servicoRepository.findByCategoria(categoria);
    }

    public List<Servico> findAll(){
        return servicoRepository.findByAgendadoFalse();
    }

    public Servico findById(Long id){
        return servicoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado"));
    }

    public List<Servico> findByEmpresaId(Long empresaId){
        Empresa empresa = empresaRepository.findById(empresaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
        return servicoRepository.findByEmpresa(empresa);
    }

    public void deletar(Long id){
        servicoRepository.deleteById(id);
    }

    public Servico reservarServico(Long servicoId, Long userId){
        Servico servico = servicoRepository.findById(servicoId)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        if(servico.isAgendado()){
            throw new RuntimeException("Serviço já agendado!");
        }
        User user = userService.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        servico.setAgendado(true);
        servico.setUsuarioAgendado(user);
        return servicoRepository.save(servico);
    }

}
