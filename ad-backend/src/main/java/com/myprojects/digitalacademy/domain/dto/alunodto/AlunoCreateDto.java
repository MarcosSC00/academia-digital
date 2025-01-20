package com.myprojects.digitalacademy.domain.dto.alunodto;

import java.time.LocalDate;

import com.myprojects.digitalacademy.domain.model.Aluno;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AlunoCreateDto (
	
	@NotBlank(message = "O nome é obrigatório.")
	@Size(min = 2, max = 50, message = "O nome deve ter entre 2 e 50 caracteres.")
	String name,

	@NotNull(message = "Informe o sexo do aluno.")
	Aluno.Sexo sexo,

	@NotBlank(message = "Informe um número de telefone.")
	@Size(min = 11, max = 11, message = "O número deve conter 11 dígitos.")
	@Pattern(regexp = "\\d{11}", message = "O número deve conter 11 dígitos incluindo o DDD")
	String telefone,

	@Email(message = "email inválido")
	@NotBlank(message = "O email é obrigatório")
	String email,

	@NotBlank(message = "Informe o endereço.")
	@Size(min = 5, max = 100, message = "O nome deve ter entre 5 e 100 caracteres.")
	String endereco,

	@NotNull(message = "Informe a data de nascimento.")
	LocalDate dataDeNascimento
	) {
	public AlunoCreateDto(Aluno model){
		this(
				model.getName(),
				model.getSexo(),
				model.getTelefone(),
				model.getEmail(),
				model.getEndereco(),
				model.getDataDeNascimento()
			);
	}

	public Aluno toModel() {
		Aluno model = new Aluno();

		model.setName(name);
		model.setSexo(sexo);
		model.setTelefone(telefone);
		model.setEmail(email);
		model.setEndereco(endereco);
		model.setDataDeNascimento(dataDeNascimento);

		return model;
	}
	
}