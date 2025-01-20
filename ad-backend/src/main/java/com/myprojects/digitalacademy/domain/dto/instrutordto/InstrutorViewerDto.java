package com.myprojects.digitalacademy.domain.dto.instrutordto;

import java.util.List;

import com.myprojects.digitalacademy.domain.model.Instrutor;

public record InstrutorViewerDto(
		String name, 
		String telefone, 
		String email,
		String imageProfile,
		String codMatricula,
		List<String> especialidades
		) {

	public InstrutorViewerDto(Instrutor model) {
		this(
				model.getName(),
				model.getTelefone(), 
				model.getEmail(),
				model.getImageProfile(),
				model.getCodMatricula(),
				model.getEspecialidades()
			);
	}

	public Instrutor toModel() {

		Instrutor model = new Instrutor();
		model.setName(name);
		model.setTelefone(telefone);
		model.setEmail(email);
		model.setImageProfile(imageProfile);
		model.setCodMatricula(codMatricula);
		model.setEspecialidades(especialidades);

		return model;
	}
}
