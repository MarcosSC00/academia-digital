package com.myprojects.digitalacademy.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.myprojects.digitalacademy.domain.dto.alunodto.AlunoViewerDto;
import com.myprojects.digitalacademy.domain.dto.auladto.AulaCreateDto;
import com.myprojects.digitalacademy.domain.dto.auladto.AulaViewerDto;
import com.myprojects.digitalacademy.domain.dto.instrutordto.InstrutorViewerDto;
import com.myprojects.digitalacademy.service.AulaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/turmas")
@CrossOrigin(origins = "http://localhost:5173")
public class AulaController {

	private final AulaService aulaService;

	public AulaController(AulaService aulaService) {
		this.aulaService = aulaService;
	}

	@GetMapping
	public ResponseEntity<List<AulaViewerDto>> getAll() {
		var aulas = aulaService.getAll();
		var aulasDto = aulas.stream().map(AulaViewerDto::new).collect(Collectors.toList());

		return ResponseEntity.ok(aulasDto);
	}

	@GetMapping("/{turmaId}")
	public ResponseEntity<AulaViewerDto> getAulaById(@PathVariable("turmaId") Long turmaId) {
		return ResponseEntity.ok(new AulaViewerDto(aulaService.getById(turmaId)));
	}

	@PostMapping
	public ResponseEntity<AulaViewerDto> createAula(@Valid @RequestBody AulaCreateDto aulaDto) {
		var aula = aulaService.create(aulaDto);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.replaceQuery(null)
				.path("/{id}")
				.buildAndExpand(aula.getId())
				.toUri();

		return ResponseEntity.created(location).body(new AulaViewerDto(aula));
	}

	@DeleteMapping("/{turmaId}")
	public ResponseEntity<String> deleteAula(@PathVariable("turmaId") Long turmaId) {
		aulaService.delete(turmaId);

		return new ResponseEntity<>("Aula deletado com sucesso.", HttpStatus.OK);
	}

	@PutMapping("/{turmaId}")
	public ResponseEntity<AulaCreateDto> upadteAula(@PathVariable("turmaId") Long turmaId,
			@RequestParam("instrutorId") Long instrutorId, @Valid @RequestBody AulaCreateDto aulaDto) {
		var aulaUpdated = aulaService.update(turmaId, instrutorId, aulaDto.toModel());

		return ResponseEntity.ok(new AulaCreateDto(aulaUpdated));
	}

	@GetMapping("/{turmaId}/buscar-alunos")
	public ResponseEntity<List<AlunoViewerDto>> getAlunos(@PathVariable("turmaId") Long turmaId) {
		var alunos = aulaService.getAlunos(turmaId);
		var alunosDto = alunos.stream().map(AlunoViewerDto::new).collect(Collectors.toList());
		return ResponseEntity.ok(alunosDto);
	}

	@GetMapping("/{turmaId}/buscar-instrutor")
	public ResponseEntity<InstrutorViewerDto> getInstrutor(@PathVariable("turmaId") Long turmaId) {
		return ResponseEntity.ok(new InstrutorViewerDto(aulaService.getInstrutor(turmaId)));
	}
}
