package com.myprojects.digitalacademy.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.AvaliacaoFisica;

public interface AlunoService {

	Aluno create(Aluno aluno , MultipartFile imagemPerfil);

	Aluno upadate(String codMatricula, Aluno aluno, MultipartFile imagemPerfil);
	
	void delete(String codMatricula);

	Aluno getById(Long alunoId);
	
	Aluno getByCodMatricula(String codMatricula);

	AvaliacaoFisica addAvaliacaoFisica(String codMatricula, AvaliacaoFisica avaliacao);

	void addAula(String codMatricula, Long aulaId);
	
	void removeTurma(String codMatricula, Long turmaId);
	
	void removeAvaliacao(String codMatricula, Long avaliacaoId);

	List<Aula> getAulas(String codMatricula);

	List<Aluno> getAll();

	List<AvaliacaoFisica> getAvaliacoesFisica(String codMatricula);

}
