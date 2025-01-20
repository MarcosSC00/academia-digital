package com.myprojects.digitalacademy.domain.dto.auladto;

import java.util.Set;
import java.util.stream.Collectors;

import com.myprojects.digitalacademy.domain.model.Aula;

public record AulaViewerDto(
		Long id,
		String name,
		String horario,
		Set<String> diasSemana,
		String instrutorCode) {
	
	public AulaViewerDto(Aula model) {
		this(
				model.getId(),
				model.getName(),
				model.getHorario(),
				model.getDiasSemana().stream().map(Enum::name).collect(Collectors.toSet()),
				model.getInstrutor().getCodMatricula()
			);
	}
	
	public Aula toModel() {
		Aula model = new Aula();

		model.setId(id);
		model.setName(name);
		model.setHorario(horario);
		model.setDiasSemana(diasSemana.stream().map(dia -> Aula.DiasSemana.valueOf(dia))
				.collect(Collectors.toSet()));
		
		return model;
	}

}
