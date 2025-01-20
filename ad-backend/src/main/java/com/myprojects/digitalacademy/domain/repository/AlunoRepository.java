package com.myprojects.digitalacademy.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myprojects.digitalacademy.domain.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long>{
	public boolean existsByEmail(String email);
	public boolean existsByCodMatricula(String code);
	public Optional<Aluno> findByCodMatricula(String codMatricula);
	boolean existsByEmailAndCodMatriculaNot(String email, String codMatricula);
}
