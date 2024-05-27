package com.gustavo.pessoa.controller;

import com.gustavo.pessoa.entity.Pessoa;
import com.gustavo.pessoa.service.PessoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/api/pessoa")
@RestController
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<Pessoa> criarPessoa(@Valid @RequestBody Pessoa pessoa) {
        return new ResponseEntity<>(pessoaService.criarPessoa(pessoa), HttpStatus.CREATED);
    }

    @GetMapping("/boletos/{id}")
    public ResponseEntity<Map<String, Object>> obterBoletoPorIdPessoa(@PathVariable String id) {
        Map<String, Object> resultado = pessoaService.obterBoletoPorIdPessoa(id);
        return ResponseEntity.ok().body(resultado);
    }

    @GetMapping
    public List<Pessoa> obterTodasPessoas() {
        return pessoaService.obterTodasPessoas();
    }

    @GetMapping("/{id}")
    public Pessoa obterPessoaPorId(@PathVariable String id) {
        return pessoaService.obterPessoaPorId(id);
    }

    @PutMapping("/{id}")
    public Pessoa atualizarPessoa(@PathVariable String id, @RequestBody Pessoa pessoaDetalhes) throws IllegalAccessException {
        return pessoaService.atualizarPessoa(id, pessoaDetalhes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPessoa(@PathVariable String id) {
        pessoaService.excluirPessoa(id);
        return ResponseEntity.noContent().build();
    }
}
