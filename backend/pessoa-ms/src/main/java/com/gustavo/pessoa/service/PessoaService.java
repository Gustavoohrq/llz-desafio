package com.gustavo.pessoa.service;

import com.gustavo.pessoa.client.boleto.BoletoClient;
import com.gustavo.pessoa.entity.Pessoa;
import com.gustavo.pessoa.exception.ResourceIsExistException;
import com.gustavo.pessoa.exception.ResourceNotFoundException;
import com.gustavo.pessoa.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.*;


@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;
    @Autowired
    private BoletoClient boletoClient;

    public Pessoa criarPessoa(Pessoa pessoa) {
        if (pessoaRepository.existsByCpf(pessoa.getCpf())) {
            throw new ResourceIsExistException("CPF já existente");
        }
        return pessoaRepository.save(pessoa);

    }

    public List<Pessoa> obterTodasPessoas() {
        return pessoaRepository.findAll();
    }

    public Pessoa obterPessoaPorId(String id) {
        var pessoa = pessoaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id não existente: " + id));
        return pessoa;
    }


    public Pessoa atualizarPessoa(String id, Pessoa pessoaDetalhes) throws IllegalAccessException {
        Pessoa pessoa = obterPessoaPorId(id);
        for (Field field : pessoaDetalhes.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            Object value = field.get(pessoaDetalhes);
            if (value != null) {
                field.set(pessoa, value);
            }
        }
        return pessoaRepository.save(pessoa);
    }

    public void excluirPessoa(String id) {
        Pessoa pessoa = obterPessoaPorId(id);
        pessoaRepository.delete(pessoa);
    }

    public Map<String, Object> obterBoletoPorIdPessoa(String id) {
        Pessoa pessoa = obterPessoaPorId(id);
        var boletos = boletoClient.obterBoletosPorPessoaId(id);

        Map<String, Object> resultado = new HashMap<>();
        resultado.put("pessoa", pessoa);
        resultado.put("boletos", boletos);

        return resultado;
    }
}

