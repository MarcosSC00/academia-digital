package com.myprojects.digitalacademy.repository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Aula.DiasSemana;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
public class AulaRepositoryIntegrationTest {

	@Autowired
	AulaRepository aulaRepository;
	
	@BeforeEach
	public void setup() {
		aulaRepository.deleteAll();
		
		Aula aula = new Aula();
		
		aula.setHorario("18:00 - 20:00");
		aula.setDiasSemana(Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA, DiasSemana.SEXTA));
		
		aulaRepository.save(aula);
	}
	
	@Test
	public void testExistsClassWithSamedDays() {
		String horario = "18:00 - 20:00";
		Set<DiasSemana> diasSemana = Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA, DiasSemana.SEXTA);
		
		boolean exists = aulaRepository.existsClassWithSameTimeAndDays(horario, diasSemana);
		assertTrue(exists, "Deveria retornar true pois há uma aula cadastrada com esses dados.");
	}
	
	@Test
	public void testNotExistsClassWithSamedDays() {
		String horario = "10:00 - 11:00";
		Set<DiasSemana> diasSemana = Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA, DiasSemana.SEXTA);
		
		boolean exists = aulaRepository.existsClassWithSameTimeAndDays(horario, diasSemana);
		assertFalse(exists, "Deveria retornar true pois há uma aula cadastrada com esses dados.");
	}
}
