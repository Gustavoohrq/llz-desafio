package com.gustavo.boleto.controller;

import com.gustavo.boleto.entity.Boleto;
import com.gustavo.boleto.service.BoletoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/boleto")
public class BoletoController {

    @Autowired
    private BoletoService boletoService;

    @PostMapping
    public ResponseEntity<Boleto> criarBoleto(@Valid @RequestBody Boleto boleto) {
        return new ResponseEntity<>(boletoService.criarBoleto(boleto), HttpStatus.CREATED);
    }

    @GetMapping("")
    public List<Boleto> buscarTodosBoleto() {
        return boletoService.buscarTodosBoleto();
    }

    @GetMapping("/pessoa/{pessoaId}")
    public List<Boleto> obterBoletosPorPessoaId(@PathVariable String pessoaId) {
        return boletoService.obterBoletosPorPessoaId(pessoaId);
    }


    @GetMapping("/{id}")
    public Boleto obterBoletoPorId(@PathVariable String id) {
        return boletoService.obterBoletoPorId(id);
    }

    @PutMapping("/pagar/{id}")
    public Boleto pagarBoleto(@PathVariable String id, @RequestParam BigDecimal valorPago, @RequestParam LocalDate dataPagamento) {
        return boletoService.pagarBoleto(id, valorPago, dataPagamento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirBoleto(@PathVariable String id) {
        boletoService.excluirBoleto(id);
        return ResponseEntity.noContent().build();
    }
}
