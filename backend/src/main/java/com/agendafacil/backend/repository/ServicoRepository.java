package com.agendafacil.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.agendafacil.backend.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long>{
    Optional<Servico> findByNome(String nome);
    List<Servico> findByCategoria(String categoria);
}
