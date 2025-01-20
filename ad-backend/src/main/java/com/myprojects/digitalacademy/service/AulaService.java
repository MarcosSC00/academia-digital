package com.myprojects.digitalacademy.service;

import java.util.List;

import com.myprojects.digitalacademy.domain.dto.auladto.AulaCreateDto;
import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Instrutor;

public interface AulaService {

	Aula create(AulaCreateDto aula);

	Aula update(Long aulaId, Long instrutorId, Aula aula);

	void delete(Long aulaId);

	Aula getById(Long aulaId);

	List<Aula> getAll();

	Instrutor getInstrutor(Long id);

	List<Aluno> getAlunos(Long id);

}
