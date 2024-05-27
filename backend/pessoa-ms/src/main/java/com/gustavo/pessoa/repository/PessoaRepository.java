package com.gustavo.pessoa.repository;

import com.gustavo.pessoa.entity.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, String> {
    boolean existsByCpf(String cpf);
}
