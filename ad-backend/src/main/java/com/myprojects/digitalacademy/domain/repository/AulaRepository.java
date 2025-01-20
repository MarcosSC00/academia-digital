package com.myprojects.digitalacademy.domain.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Aula.DiasSemana;

public interface AulaRepository extends JpaRepository<Aula, Long>{
	public boolean existsByName(String name);
	public boolean existsById(Long id);
	
	@Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
	           "FROM tb_aula a " +
	           "JOIN a.diasSemana ds " +
	           "WHERE a.horario = :horario " +
	           "AND ds IN :diasSemana")
	public boolean existsClassWithSameTimeAndDays(@Param("horario") String horario,
												  @Param("diasSemana") Set<DiasSemana> diasSemana);
}
