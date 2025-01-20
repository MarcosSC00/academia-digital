package com.myprojects.digitalacademy.domain.dto.avaliacaodto;

import java.time.LocalDate;

import com.myprojects.digitalacademy.domain.model.AvaliacaoFisica;

public record AvaliacaoViewerDto(
		Long id,
		LocalDate dataAvaliacao, 
		double peso, 
		double altura,
		String resultado
		) {
	public AvaliacaoViewerDto(AvaliacaoFisica model) {
		this(
				model.getId(),
				model.getDataAvaliacao(),
				model.getPeso(),
				model.getAltura(),
				model.getResultado()
			);
		 
	}
	
	public AvaliacaoFisica toModel() {
		
		AvaliacaoFisica model = new AvaliacaoFisica();
		
		model.setId(id);
		model.setDataAvaliacao(dataAvaliacao);
		model.setPeso(peso);
		model.setAltura(altura);
		model.setResultado(resultado);
		
		return model;
	}
}
