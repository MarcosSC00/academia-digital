package com.myprojects.digitalacademy.controller.exceptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.exception.NotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BusinessException.class)
	private ResponseEntity<Object> handleBusinessException(BusinessException ex) {
		Map<String, String> errorResponse = new HashMap<>();
		errorResponse.put("message", ex.getMessage());
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorResponse);
	}

	@ExceptionHandler(NotFoundException.class)
	private ResponseEntity<Object> handleNotFoundException(NotFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\"" +ex.getMessage()+"\"}");
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationEception(MethodArgumentNotValidException ex){
		
		Map<String, Object> responseBody = new HashMap<>();
		List<Map<String, String>> errors = ex.getFieldErrors().stream().map(erro -> {
			Map<String, String> errorMap = new HashMap<>();
			errorMap.put("field", erro.getField());
			errorMap.put("message", erro.getDefaultMessage());
			return errorMap;
		}).toList();
		
		responseBody.put("status", HttpStatus.BAD_REQUEST.value());
		responseBody.put("errors", errors);
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}
}
