package com.myprojects.digitalacademy.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.myprojects.digitalacademy.domain.model.Instrutor;

public interface InstrutorRepository extends JpaRepository<Instrutor, Long>{
	public boolean existsByEmail(String email);
	public boolean existsById(Long id);
	public boolean existsByCodMatricula(String codMatricula);
	public Optional<Instrutor> findById(Long id);
	public Optional<Instrutor> findByName(String name);
	public Optional<Instrutor> findByCodMatricula(String codInstrutor);
	public boolean existsByEmailAndCodMatriculaNot(String email, String codMatricula);
}