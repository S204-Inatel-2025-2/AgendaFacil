package com.agendafacil.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agendafacil.backend.model.Servico;
import com.agendafacil.backend.repository.ServicoRepository;

import com.agendafacil.backend.model.User;

@Service
public class ServicoService {
    @Autowired
    private ServicoRepository servicoRepository;
    
    @Autowired
    private UserService userService;

    public Servico cadastrar(Servico servico){
        return servicoRepository.save(servico);
    }

    public Optional<Servico> findByNome(String nome){
        return servicoRepository.findByNome(nome);
    }

    public List<Servico> findByCategoria(String categoria){
        return servicoRepository.findByCategoria(categoria);
    }

    //todo: filtrar por agendados
    public List<Servico> findAll(){
        return servicoRepository.findAll();
    }

    public Optional<Servico> findById(Long id){
        return servicoRepository.findById(id);
    }
    public void deletar(Long id){
        servicoRepository.deleteById(id);
    }

    public Servico reservarServico(Long servicoId, Long userId){
        Servico servico = servicoRepository.findById(servicoId)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        //if(servico.isAgendado())
        User user = userService.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        servico.setAgendado(true);
        servico.setUsuarioAgendado(user);
        return servicoRepository.save(servico);
    }

}
