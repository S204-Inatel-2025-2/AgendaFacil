package com.agendafacil.backend.repository;

import java.util.Optional;
import com.agendafacil.backend.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa,Long>{
    Optional<Empresa> findByCnpj(String cnpj);
    Optional<Empresa> findByEmail(String email);
}
