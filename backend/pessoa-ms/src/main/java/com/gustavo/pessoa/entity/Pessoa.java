package com.gustavo.pessoa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;

@Entity(name = "pessoa")
@Table(name = "pessoa")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotEmpty(message = "O nome é obrigatório")
    @Size(min = 2, max = 100, message = "O nome deve ter entre 2 e 100 caracteres")
    private String nome;

    @CPF
    @NotEmpty(message = "CPF obrigatório")
    private String cpf;

    @NotEmpty(message = "Data de nascimento obrigatoria")
    private String dataNascimento;

}

