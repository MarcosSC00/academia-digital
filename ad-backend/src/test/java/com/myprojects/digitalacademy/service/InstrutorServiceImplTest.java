package com.myprojects.digitalacademy.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.myprojects.digitalacademy.domain.model.Instrutor;
import com.myprojects.digitalacademy.domain.repository.InstrutorRepository;
import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.impl.InstrutorServiceImpl;

@ExtendWith(MockitoExtension.class)
class InstrutorServiceImplTest {
	
	@Mock
	private InstrutorRepository instRepository;
	
	@InjectMocks
	private InstrutorServiceImpl service;

	@Test
	void testCreateInstrutorSuccessFul() {
		Instrutor instrutor = new Instrutor(1L, "José", "99999999999", "jose@gmail.com", List.of("Yoga", "Zumba"));
		when(instRepository.existsByEmail(any())).thenReturn(false);
		when(service.create(instrutor, any())).thenReturn(instrutor);
		service.create(instrutor, any());
		verify(instRepository, times(1)).save(any());
	}
	
	@Test
	void testCreateInstrutorFailure() {
		Instrutor instrutor = new Instrutor(1L, "José", "99999999999", "jose@gmail.com", List.of("Yoga", "Zumba"));
		when(instRepository.existsByEmail(any())).thenReturn(true);
		
		BusinessException exceptionEmail = assertThrows(BusinessException.class, () -> service.create(instrutor, any()));
		assertEquals("email já cadastrado.", exceptionEmail.getMessage());
		
	}

}
