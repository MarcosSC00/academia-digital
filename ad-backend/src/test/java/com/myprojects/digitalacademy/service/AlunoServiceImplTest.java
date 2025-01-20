package com.myprojects.digitalacademy.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.domain.model.AvaliacaoFisica;
import com.myprojects.digitalacademy.domain.repository.AlunoRepository;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;
import com.myprojects.digitalacademy.domain.repository.AvaliacaoFisicaRepository;
import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.impl.AlunoServiceImpl;

@ExtendWith(MockitoExtension.class)
class AlunoServiceImplTest {
	
	@Mock
	private AlunoRepository alunoRepository;
	
	@Mock
	private AulaRepository aulaRepository;
	
	@Mock
	private AvaliacaoFisicaRepository afRepository;
	
	@InjectMocks
	private AlunoServiceImpl alunoService;

	@Test
	void testSuccessFulCreateAluno() {
		Aluno aluno = new Aluno(1L, "Marcos", Aluno.Sexo.MASCULINO, LocalDate.of(2000, Month.FEBRUARY, 5),
				"99999999999", "ms@gmail.com", "Rua da Cooperativa", LocalDate.now());
		when(alunoService.create(aluno, any())).thenReturn(aluno);
		
		alunoService.create(aluno, any());
		
		verify(alunoRepository, times(1)).save(any());
	}
	
	@Test
	void testFailureCreateAlunoWithSameEmail() {
		when(alunoRepository.existsByEmail(any())).thenReturn(true);
		
		BusinessException exceptionEmail = assertThrows(BusinessException.class, () -> alunoService.create(new Aluno(), any()));
		assertEquals("Já existe um aluno com este email.", exceptionEmail.getMessage());
	}
	
	@Test
	void testSuccessFulAddAvaliationToAluno() {
		when(alunoRepository.findById(any())).thenReturn(Optional.of(new Aluno()));
		
		AvaliacaoFisica af2 = new AvaliacaoFisica(74.0, 1.9);
		af2.setResultado(alunoService.resultAvaliacao(af2.getPeso(), af2.getAltura()).toString());
		
		alunoService.addAvaliacaoFisica(any(), af2);
		
		verify(afRepository, times(1)).save(any());
		
		//melhorar o retorno do resultado vindo do serviço
		assertEquals("{pgc=15.248541666666664, imc=20.07378472222222}", alunoService.resultAvaliacao(af2.getPeso(), af2.getAltura()).toString());
	}
	
	@Test
	void testFailureToAddAvaliationToAluno() {
		when(alunoRepository.findById(any())).thenReturn(Optional.of(new Aluno()));
		AvaliacaoFisica af = null;
		BusinessException exceptionEmail = assertThrows(BusinessException.class, () -> alunoService.addAvaliacaoFisica(any(), af));
		assertEquals("avaliação inválida.", exceptionEmail.getMessage());
	}

}
