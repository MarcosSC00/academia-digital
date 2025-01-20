package com.myprojects.digitalacademy.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.myprojects.digitalacademy.domain.dto.auladto.AulaViewerDto;
import com.myprojects.digitalacademy.domain.dto.instrutordto.InstrutorCreateDto;
import com.myprojects.digitalacademy.domain.dto.instrutordto.InstrutorViewerDto;
import com.myprojects.digitalacademy.domain.model.Instrutor;
import com.myprojects.digitalacademy.service.InstrutorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/instrutores")
@CrossOrigin(origins = "http://localhost:5173")
public class InstrutorController {
	
	private final InstrutorService service;
	
	public InstrutorController(InstrutorService service) {
		this.service = service;
	}

	@GetMapping
	public ResponseEntity<List<InstrutorViewerDto>> getAll(){
		var instrutores = service.getAll();
		var instrutoresDto = instrutores.stream().map(InstrutorViewerDto::new).collect(Collectors.toList());
		return ResponseEntity.ok(instrutoresDto);
	}
	
	@GetMapping("/{instrutorId}")
	public ResponseEntity<InstrutorViewerDto> getById(@PathVariable("instrutorId") Long instrutorId){
		return ResponseEntity.ok(new InstrutorViewerDto(service.getById(instrutorId)));
	}
	
	@GetMapping("/cod/{codMatricula}")
	public ResponseEntity<InstrutorViewerDto> getByCodMatricula(@PathVariable("codMatricula") String codMatricula){
		return ResponseEntity.ok(new InstrutorViewerDto(service.getByCodMatricula(codMatricula)));
	}
	
	@GetMapping("/name/{instrutorName}")
	public ResponseEntity<InstrutorViewerDto> getByName(@PathVariable("instrutorName") String instrutorName){
		return ResponseEntity.ok(new InstrutorViewerDto(service.getByName(instrutorName)));
	}
	
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<InstrutorCreateDto> create(@Valid @RequestPart("instrutor") InstrutorCreateDto instrutorDto,
			@RequestPart(name="file" ,required = false) MultipartFile file){
		Instrutor instrutor = service.create(instrutorDto.toModel(), file);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(instrutor.getId()).toUri();
		return ResponseEntity.created(location).body(new InstrutorCreateDto(instrutor));
	}
	
	@PutMapping(value="/{instrutorCodParam}", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<InstrutorViewerDto> update(
			@PathVariable("instrutorCodParam") String instrutorCodParam, 
			@Valid @RequestPart("instrutorToUpdate") InstrutorCreateDto instrutorDto,
			@RequestPart(name="file", required = false) MultipartFile file){
		var instrutorUpadated = service.update(instrutorCodParam, instrutorDto.toModel(), file);
		return ResponseEntity.ok(new InstrutorViewerDto(instrutorUpadated));
	}
	
	@GetMapping("/{codMatricula}/buscar-aulas")
	public ResponseEntity<List<AulaViewerDto>> getAulas(@PathVariable("codMatricula") String codMatricula){
		var aulas = service.getAulas(codMatricula);
		var aulasDto = aulas.stream().map(AulaViewerDto::new).collect(Collectors.toList());
		return ResponseEntity.ok(aulasDto);
	}
	
	@PostMapping("/{codMatricula}/adicionar-aula")
	public ResponseEntity<String> addAula(@PathVariable("codMatricula")String codMatricula,
			@RequestParam("aulaId") Long aulaId){
		service.addAula(aulaId, codMatricula);
		return ResponseEntity.ok("aula adiciona com sucesso.");
	}
	
	@DeleteMapping("{codMatricula}/remove-turma/{turmaId}")
	public ResponseEntity<String> removeTurma(@PathVariable("codMatricula") String codMatricula,
			@PathVariable("turmaId") Long turmaId){
		service.removeTurma(codMatricula, turmaId);
		return ResponseEntity.ok("turma deletada com sucesso.");
	}
	
	@DeleteMapping("{codInstrutor}")
	public ResponseEntity<String> delete(@PathVariable("codInstrutor") String codInstrutor){
		service.delete(codInstrutor);
		return ResponseEntity.ok("instrutor deletado com sucesso.");
	}
}
