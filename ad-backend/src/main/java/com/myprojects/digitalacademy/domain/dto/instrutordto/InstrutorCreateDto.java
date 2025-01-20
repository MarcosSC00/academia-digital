package com.myprojects.digitalacademy.domain.dto.instrutordto;

import java.util.List;

import com.myprojects.digitalacademy.domain.model.Instrutor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record InstrutorCreateDto(
		@NotBlank(message="Este campo é obrigatório.")
		@Size(min=3, max=100)
		String name, 
		
		@NotBlank(message="Este campo é obrigatório.")
		@Pattern(regexp = "\\d{11}", message = "número de telofone inválido.")
		String telefone, 
		
		@NotBlank(message="Este campo é obrigatório.")
		@Email
		String email,
		
		String imgProcfile,
		
		@NotNull(message="Este campo é obrigatório.")
		@NotEmpty(message="Este campo é obrigatório.")
		List<String> especialidades
		) {

	public InstrutorCreateDto(Instrutor model) {
		this(
				model.getName(),
				model.getTelefone(), 
				model.getEmail(),
				model.getImageProfile(),
				model.getEspecialidades()
			);
	}

	public Instrutor toModel() {

		Instrutor model = new Instrutor();
		model.setName(name);
		model.setTelefone(telefone);
		model.setEmail(email);
		model.setImageProfile(imgProcfile);
		model.setEspecialidades(especialidades);

		return model;
	}
}
