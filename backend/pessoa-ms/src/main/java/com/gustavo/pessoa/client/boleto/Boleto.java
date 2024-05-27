package com.gustavo.pessoa.client.boleto;

import java.math.BigDecimal;

public record Boleto (
        String id,
        String pessoaId,
        BigDecimal valor,
        String valorPago,
        String dataVencimento,
        String dataPagamento,
        String status
) {}
