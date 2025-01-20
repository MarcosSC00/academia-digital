package com.myprojects.digitalacademy.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Instrutor;

public interface InstrutorService {

	Instrutor create(Instrutor instrutor, MultipartFile file);

	Instrutor update(String codMatricula, Instrutor instrutor, MultipartFile file);

	void delete(String codMatricula);

	Instrutor getById(Long instrutorId);
	
	Instrutor getByName(String name);
	
	Instrutor getByCodMatricula(String codMatricula);

	List<Instrutor> getAll();

	void addAula(Long aulaId, String codMatricula);

	List<Aula> getAulas(String codMatricula);
	
	void removeTurma(String codMatricula, Long  turmaId);
	
}
