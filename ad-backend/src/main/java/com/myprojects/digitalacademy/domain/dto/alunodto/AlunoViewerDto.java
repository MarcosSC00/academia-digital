package com.myprojects.digitalacademy.domain.dto.alunodto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.myprojects.digitalacademy.domain.dto.auladto.AulaViewerDto;
import com.myprojects.digitalacademy.domain.dto.avaliacaodto.AvaliacaoViewerDto;
import com.myprojects.digitalacademy.domain.model.Aluno;

public record AlunoViewerDto(
		String name,
		Aluno.Sexo sexo,
		String telefone, 
		String email, 
		String endereco,
		LocalDate dataDeNascimento, 
		LocalDate dataMatricula,
		String imageProfile,
		String codMatricula,
		List<AvaliacaoViewerDto> avaliacoes,
		List<AulaViewerDto> aulas) {
	
	public AlunoViewerDto(Aluno model) {
		this(
				model.getName(),
				model.getSexo(),
				model.getTelefone(),
				model.getEmail(),
				model.getEndereco(),
				model.getDataDeNascimento(),
				model.getDataMatricula(),
				model.getImageProfile(),
				model.getCodMatricula(),
				model.getAvaliacoesFisicas().stream().map(AvaliacaoViewerDto::new)
					.collect(Collectors.toList()),
				model.getAulas().stream().map(AulaViewerDto::new).collect(Collectors.toList())
			);
	}

	public Aluno toModel() {
		Aluno model = new Aluno();
		
		model.setName(name);
		model.setTelefone(telefone);
		model.setEmail(email);
		model.setEndereco(endereco);
		model.setDataDeNascimento(dataDeNascimento);
		model.setDataMatricula(dataMatricula);
		model.setImageProfile(imageProfile);
		model.setCodMatricula(codMatricula);
		model.setAvaliacoesFisicas(avaliacoes.stream().map(AvaliacaoViewerDto::toModel)
				.collect(Collectors.toList()));
		model.setAulas(aulas.stream().map(AulaViewerDto::toModel).collect(Collectors.toList()));
		
		return model;
	}
}
