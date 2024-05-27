package com.gustavo.boleto.repository;

import com.gustavo.boleto.entity.Boleto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoletoRepository extends JpaRepository<Boleto, String> {
    List<Boleto> findByPessoaId(String pessoaId);
}
