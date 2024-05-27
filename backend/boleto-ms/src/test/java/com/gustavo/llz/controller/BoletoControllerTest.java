package com.gustavo.llz.controller;

import com.gustavo.boleto.controller.BoletoController;
import com.gustavo.boleto.dto.CriarBoletoDto;
import com.gustavo.boleto.entity.Boleto;
import com.gustavo.boleto.service.BoletoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class BoletoControllerTest {

    @Mock
    private BoletoService boletoService;

    @InjectMocks
    private BoletoController boletoController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarBoleto() {
        CriarBoletoDto boletoDto = new CriarBoletoDto();
        Boleto boleto = new Boleto();
        when(boletoService.criarBoleto(boletoDto)).thenReturn(boleto);

        ResponseEntity<Boleto> response = boletoController.criarBoleto(boletoDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(boleto, response.getBody());
        verify(boletoService, times(1)).criarBoleto(boletoDto);
    }

    @Test
    public void testBuscarTodosBoleto() {
        Boleto boleto = new Boleto();
        List<Boleto> boletos = Collections.singletonList(boleto);
        when(boletoService.buscarTodosBoleto()).thenReturn(boletos);

        List<Boleto> result = boletoController.buscarTodosBoleto();

        assertEquals(boletos, result);
        verify(boletoService, times(1)).buscarTodosBoleto();
    }

    @Test
    public void testObterBoletosPorPessoaId() {
        String pessoaId = "123";
        Boleto boleto = new Boleto();
        List<Boleto> boletos = Collections.singletonList(boleto);
        when(boletoService.obterBoletosPorPessoaId(pessoaId)).thenReturn(boletos);

        List<Boleto> result = boletoController.obterBoletosPorPessoaId(pessoaId);

        assertEquals(boletos, result);
        verify(boletoService, times(1)).obterBoletosPorPessoaId(pessoaId);
    }

    @Test
    public void testObterBoletoPorId() {
        String id = "123";
        Boleto boleto = new Boleto();
        when(boletoService.obterBoletoPorId(id)).thenReturn(boleto);

        Boleto result = boletoController.obterBoletoPorId(id);

        assertEquals(boleto, result);
        verify(boletoService, times(1)).obterBoletoPorId(id);
    }

    @Test
    public void testPagarBoleto() {
        String id = "123";
        BigDecimal valorPago = new BigDecimal("100.00");
        LocalDate dataPagamento = LocalDate.now();
        Boleto boleto = new Boleto();
        when(boletoService.pagarBoleto(id, valorPago, dataPagamento)).thenReturn(boleto);

        Boleto result = boletoController.pagarBoleto(id, valorPago, dataPagamento);

        assertEquals(boleto, result);
        verify(boletoService, times(1)).pagarBoleto(id, valorPago, dataPagamento);
    }

    @Test
    public void testExcluirBoleto() {
        String id = "123";

        ResponseEntity<Void> response = boletoController.excluirBoleto(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(boletoService, times(1)).excluirBoleto(id);
    }
}
