package com.gustavo.boleto.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CriarBoletoDto {


    @NotNull(message = "O ID da pessoa não pode ser nulo")
    private String pessoaId;

    @Positive(message = "O valor deve ser positivo")
    @NotNull(message = "O valor não pode ser nulo")
    private BigDecimal valor;

    @NotNull(message = "A data de vencimento não pode ser nulo")
    @FutureOrPresent(message = "A data de vencimento deve ser no futuro ou presente")
    private LocalDate dataVencimento;

}