package com.agendafacil.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agendafacil.backend.DTO.ServicoDTO;
import com.agendafacil.backend.model.Servico;
import com.agendafacil.backend.service.ServicoService;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
    @Autowired
    private ServicoService servicoService;

    @PostMapping("/cadastrar")
    public Servico cadastrar(@RequestBody ServicoDTO servicoDTO){
        Servico servico = new Servico(servicoDTO.getNome(), servicoDTO.getCategoria(), servicoDTO.getDescricao(), servicoDTO.getDuracao_minutos(), servicoDTO.getPreco());
        return servicoService.cadastrar(servico, servicoDTO.getEmpresaId());
    }

    @GetMapping
    public List<Servico> getAllServicos(){
        return servicoService.findAll();
    }

    @GetMapping("/empresa/{empresaId}")
    public List<Servico> getServicoByEmpresa(@PathVariable Long empresaId){
        return servicoService.findByEmpresaId(empresaId);
    }

    @GetMapping("/{id}")
    public Servico getServicoById(@PathVariable Long id){
        return servicoService.findById(id);
    }

    @GetMapping("/categoria/{categoria}")
    public List<Servico> getServicoByCategoria(@PathVariable String categoria){
        return servicoService.findByCategoria(categoria);
    }

    @GetMapping("/nome/{nome}")
    public Servico getServicoByNome(@PathVariable String nome){
        return servicoService.findByNome(nome);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        servicoService.deletar(id);
    }
    
    @PostMapping("/{id}/reservar")
    public Servico reservarServico(@PathVariable Long id, @RequestParam Long userId){
        return servicoService.reservarServico(id, userId);
    }
}
