package com.gustavo.boleto.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity(name = "boleto")
@Table(name = "boleto")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Boleto {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private String id;

        @NotNull(message = "O ID da pessoa não pode ser nulo")
        private String pessoaId;

        @Positive(message = "O valor deve ser positivo")
        @NotNull(message = "O valor não pode ser nulo")
        private BigDecimal valor;

        private BigDecimal valorPago;

        @NotNull(message = "A data de vencimento não pode ser nulo")
        @FutureOrPresent(message = "A data de vencimento deve ser no futuro ou presente")
        private LocalDate dataVencimento;

        private LocalDate dataPagamento;

        @NotNull(message = "O status não pode ser nulo")
        @Pattern(regexp = "^(?i)(pago|pendente|vencido)$", message = "O status deve ser 'pago', 'pendente' ou 'vencido'")
        private String status;

}

