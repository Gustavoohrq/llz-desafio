package com.gustavo.boleto.service;

import com.gustavo.boleto.dto.CriarBoletoDto;
import com.gustavo.boleto.entity.Boleto;
import com.gustavo.boleto.exception.BusinessException;
import com.gustavo.boleto.exception.ResourceIsExistException;
import com.gustavo.boleto.exception.ResourceNotFoundException;
import com.gustavo.boleto.repository.BoletoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class BoletoService {

    @Autowired
    private BoletoRepository boletoRepository;

    public Boleto criarBoleto(CriarBoletoDto body) {
        Boleto boleto = new Boleto();
        boleto.setPessoaId(body.getPessoaId());
        boleto.setValor(body.getValor());
        boleto.setDataVencimento(body.getDataVencimento());
        boleto.setStatus("Pendente");
        return boletoRepository.save(boleto);
    }

    public List<Boleto> obterBoletosPorPessoaId(String pessoaId) {
        return boletoRepository.findByPessoaId(pessoaId);
    }

    public List<Boleto> buscarTodosBoleto() {
        return boletoRepository.findAll();
    }

    public Boleto obterBoletoPorId(String id) {
        return boletoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Boleto não encontrado"));
    }

    public Boleto pagarBoleto(String id, BigDecimal valorPago, LocalDate dataPagamento) {
        Boleto boleto = obterBoletoPorId(id);

        if (boleto.getStatus().equals("Pago")) {
            throw new BusinessException("Boleto já está pago", HttpStatus.CONFLICT);
        }

        if (dataPagamento.isAfter(LocalDate.now())) {
            throw new BusinessException("Data de pagamento não pode ser futura", HttpStatus.BAD_REQUEST);
        }

        if (valorPago.compareTo(boleto.getValor()) < 0) {
            throw new BusinessException("Valor pago não pode ser menor que o valor do boleto", HttpStatus.UNPROCESSABLE_ENTITY);
        }
        boleto.setValorPago(valorPago);
        boleto.setDataPagamento(dataPagamento);
        boleto.setStatus("Pago");
        return boletoRepository.save(boleto);
    }

    public void excluirBoleto(String id) {
        Boleto boleto = obterBoletoPorId(id);
        if (boleto.getStatus().equals("Pago")) {
            throw new BusinessException("Não é possível excluir boleto pago",HttpStatus.BAD_REQUEST);
        }
        boletoRepository.delete(boleto);
    }
}

