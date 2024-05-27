package com.gustavo.pessoa.controller;

import com.gustavo.pessoa.controller.PessoaController;
import com.gustavo.pessoa.entity.Pessoa;
import com.gustavo.pessoa.service.PessoaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PessoaControllerTest {

    @Mock
    private PessoaService pessoaService;

    @InjectMocks
    private PessoaController pessoaController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCriarPessoa() {
        Pessoa pessoa = new Pessoa();
        when(pessoaService.criarPessoa(pessoa)).thenReturn(pessoa);

        ResponseEntity<Pessoa> response = pessoaController.criarPessoa(pessoa);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(pessoa, response.getBody());
        verify(pessoaService, times(1)).criarPessoa(pessoa);
    }

    @Test
    public void testObterBoletoPorIdPessoa() {
        String id = "123";
        Map<String, Object> resultado = Collections.singletonMap("key", "value");
        when(pessoaService.obterBoletoPorIdPessoa(id)).thenReturn(resultado);

        ResponseEntity<Map<String, Object>> response = pessoaController.obterBoletoPorIdPessoa(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(resultado, response.getBody());
        verify(pessoaService, times(1)).obterBoletoPorIdPessoa(id);
    }

    @Test
    public void testObterTodasPessoas() {
        Pessoa pessoa = new Pessoa();
        List<Pessoa> pessoas = Collections.singletonList(pessoa);
        when(pessoaService.obterTodasPessoas()).thenReturn(pessoas);

        List<Pessoa> result = pessoaController.obterTodasPessoas();

        assertEquals(pessoas, result);
        verify(pessoaService, times(1)).obterTodasPessoas();
    }

    @Test
    public void testObterPessoaPorId() {
        String id = "123";
        Pessoa pessoa = new Pessoa();
        when(pessoaService.obterPessoaPorId(id)).thenReturn(pessoa);

        Pessoa result = pessoaController.obterPessoaPorId(id);

        assertEquals(pessoa, result);
        verify(pessoaService, times(1)).obterPessoaPorId(id);
    }

    @Test
    public void testAtualizarPessoa() throws IllegalAccessException {
        String id = "123";
        Pessoa pessoaDetalhes = new Pessoa();
        Pessoa pessoaAtualizada = new Pessoa();
        when(pessoaService.atualizarPessoa(id, pessoaDetalhes)).thenReturn(pessoaAtualizada);

        Pessoa result = pessoaController.atualizarPessoa(id, pessoaDetalhes);

        assertEquals(pessoaAtualizada, result);
        verify(pessoaService, times(1)).atualizarPessoa(eq(id), eq(pessoaDetalhes));
    }

    @Test
    public void testExcluirPessoa() {
        String id = "123";

        ResponseEntity<Void> response = pessoaController.excluirPessoa(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(pessoaService, times(1)).excluirPessoa(id);
    }
}
