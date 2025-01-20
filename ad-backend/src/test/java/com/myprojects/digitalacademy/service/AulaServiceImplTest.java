package com.myprojects.digitalacademy.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.myprojects.digitalacademy.domain.dto.auladto.AulaCreateDto;
import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Aula.DiasSemana;
import com.myprojects.digitalacademy.domain.model.Instrutor;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;
import com.myprojects.digitalacademy.domain.repository.InstrutorRepository;
import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.impl.AulaServiceImpl;

@ExtendWith(MockitoExtension.class)
public class AulaServiceImplTest {
	
	@Mock
	private AulaRepository aulaRepository;
	
	@Mock
	private InstrutorRepository instRepository;
	
	@Autowired
	@InjectMocks
	private AulaServiceImpl aulaService;
	
	@Test
	void testSuccessFulClass() {
		Aula aulaToTest = new Aula(1L, "Yoga", "18:00 - 20:00", Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA));
		Instrutor instrutorToTest = new Instrutor(1L, "Geovane", "99999999999", "geo@gmail.com", List.of("Yoga", "Pilates"));
		
		when(instRepository.findById(1L)).thenReturn(Optional.of(instrutorToTest));
		when(aulaRepository.existsClassWithSameTimeAndDays(aulaToTest.getHorario(), aulaToTest.getDiasSemana())).thenReturn(false);
		when(aulaRepository.save(any(Aula.class))).thenReturn(aulaToTest);
	  
	    aulaService.create(new AulaCreateDto(aulaToTest));
	    
	    verify(aulaRepository, times(1)).save(any());
	}
	
	@Test
	void testFailureClassWithNotFounInstrutor() {
		Aula aulaToTest = new Aula(1L, "Yoga", "18:00 - 20:00", Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA));
		
		when(instRepository.findById(any())).thenReturn(Optional.empty());
		
		BusinessException exception = assertThrows(BusinessException.class, () -> aulaService.create(new AulaCreateDto(aulaToTest)));
		assertEquals("instrutor não encontrado.", exception.getMessage());
	}
	
	@Test
	void testFailureClassWithSameTime() {	
		Instrutor instrutorToTest = new Instrutor(1L, "Geovane", "99999999999", "geo@gmail.com", List.of("Yoga", "Pilates"));
		Aula aulaToTest = new Aula(1L, "CrossFit", "18:00 - 20:00", Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA));
		
		when(instRepository.findById(any())).thenReturn(Optional.of(instrutorToTest));
		when(aulaRepository.existsClassWithSameTimeAndDays(any(), any())).thenReturn(true);
		
		BusinessException exceptionSameTime = assertThrows(BusinessException.class, () -> aulaService.create(new AulaCreateDto(aulaToTest)));
		assertEquals("Horário indisponível.", exceptionSameTime.getMessage());
	}
	
	@Test
	void testFailureClassInstrutorInapt() {	
		Instrutor instrutorToTest = new Instrutor(1L, "Geovane", "99999999999", "geo@gmail.com", List.of("Yoga", "Pilates"));
		Aula aulaToTest = new Aula(1L, "Yoga", "18:00 - 20:00", Set.of(DiasSemana.SEGUNDA, DiasSemana.QUARTA));
		
		when(instRepository.findById(any())).thenReturn(Optional.of(instrutorToTest));
		when(aulaRepository.existsClassWithSameTimeAndDays(any(), any())).thenReturn(false);
		
		BusinessException exceptionInapt = assertThrows(BusinessException.class, () -> aulaService.create(new AulaCreateDto(aulaToTest)));
		assertEquals("O instrutor não é apto para esta aula.", exceptionInapt.getMessage());	
	}
}
