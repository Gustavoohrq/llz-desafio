package com.gustavo.pessoa.client.boleto;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@FeignClient(name = "boleto-service", url = "${boleto.url}")
public interface BoletoClient {

    @GetMapping("${boleto.path.pessoa}/{pessoaId}")
    List<Boleto> obterBoletosPorPessoaId(@PathVariable("pessoaId") String pessoaId);
}

