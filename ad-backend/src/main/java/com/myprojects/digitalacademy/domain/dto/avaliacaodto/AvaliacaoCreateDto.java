package com.myprojects.digitalacademy.domain.dto.avaliacaodto;

import com.myprojects.digitalacademy.domain.model.AvaliacaoFisica;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AvaliacaoCreateDto(
		
		@NotNull(message="Campo obrigatório")
		@Min(1)
		double peso,
		
		@NotNull(message="Campo obrigatório")
		@Min(1)
		@Max(3)
		double altura) {

	public AvaliacaoCreateDto(AvaliacaoFisica model) {
		this(
				model.getPeso(),
				model.getAltura()
			);	 
	}
	
	public AvaliacaoFisica toModel() {
		
		AvaliacaoFisica model = new AvaliacaoFisica();
		model.setPeso(peso);
		model.setAltura(altura);
		
		return model;
	}
}
