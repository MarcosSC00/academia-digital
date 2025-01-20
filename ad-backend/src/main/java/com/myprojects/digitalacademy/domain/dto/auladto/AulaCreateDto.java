package com.myprojects.digitalacademy.domain.dto.auladto;

import java.util.Set;
import java.util.stream.Collectors;

import com.myprojects.digitalacademy.domain.model.Aula;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AulaCreateDto(
		@NotBlank(message="Este campo é obrigatório.")
		@Size(min=3, max=30)
		String name,
		
		@Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$")
		@NotBlank(message="Este campo é obrigatório.")
		String horario,
		
		@NotNull(message="Este campo é obrigatório.")
		@NotEmpty(message="Este campo é obrigatório.")
		Set<String> diasSemana,
		
		@NotNull(message="Este campo é obrigatório.")
		@NotBlank(message="Este campo é obrigatório.")
		String instrutorCode
		) {
	
	public AulaCreateDto(Aula model) {
		this(
				model.getName(),
				model.getHorario(),
				model.getDiasSemana().stream().map(Enum::name).collect(Collectors.toSet()),
				model.getInstrutor().getCodMatricula()
			);
	}
	
	public Aula toModel() {
		Aula model = new Aula();
		
		model.setName(name);
		model.setHorario(horario);
		model.setDiasSemana(diasSemana.stream().map(dia -> Aula.DiasSemana.valueOf(dia))
				.collect(Collectors.toSet()));
		return model;
	}

}
