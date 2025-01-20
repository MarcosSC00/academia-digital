package com.myprojects.digitalacademy.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.myprojects.digitalacademy.domain.dto.alunodto.AlunoCreateDto;
import com.myprojects.digitalacademy.domain.dto.alunodto.AlunoUpdateDto;
import com.myprojects.digitalacademy.domain.dto.alunodto.AlunoViewerDto;
import com.myprojects.digitalacademy.domain.dto.auladto.AulaViewerDto;
import com.myprojects.digitalacademy.domain.dto.avaliacaodto.AvaliacaoCreateDto;
import com.myprojects.digitalacademy.domain.dto.avaliacaodto.AvaliacaoViewerDto;
import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.service.AlunoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {

	private AlunoService alunoService;

	public AlunoController(AlunoService alunoRep) {
		this.alunoService = alunoRep;
	}

	@GetMapping
	public ResponseEntity<List<AlunoViewerDto>> getAll() {
		var alunos = alunoService.getAll();
		var alunoDto = alunos.stream().map(AlunoViewerDto::new).collect(Collectors.toList());

		return ResponseEntity.ok(alunoDto);
	}

//	@GetMapping("/{alunoId}")
//	public ResponseEntity<AlunoViewerDto> getAlunoById(@PathVariable("alunoId") Long alunoId) {
//		return ResponseEntity.ok(new AlunoViewerDto(alunoService.getById(alunoId)));
//	}

	@GetMapping("/cod/{codMatricula}")
	public ResponseEntity<AlunoViewerDto> getAlunoByCodMatricula(@PathVariable("codMatricula") String codMatricula) {
		return ResponseEntity.ok(new AlunoViewerDto(alunoService.getByCodMatricula(codMatricula)));
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> create(@Valid @RequestPart("aluno") AlunoCreateDto aluno,
			@RequestPart(name = "file", required = false) MultipartFile file) {
		var alunoCreated = alunoService.create(aluno.toModel(), file);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(alunoCreated.getId()).toUri();

		return ResponseEntity.created(location).body(alunoCreated);
	}

	@PostMapping("/{codMatricula}/adicionar-turma/{turmaId}")
	public ResponseEntity<String> addTurma(@PathVariable("codMatricula") String codMatricula,
			@PathVariable("turmaId") Long turmaId) {
		alunoService.addAula(codMatricula, turmaId);

		return ResponseEntity.ok("aula inserida com sucesso");
	}

	@PutMapping(value = "{alunoCodParam}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> updateAluno(@PathVariable("alunoCodParam") String alunoCodParam,
			@Valid @RequestPart("alunoToUpdate") AlunoUpdateDto aluno,
			@RequestPart(name = "file", required = false) MultipartFile file) {

		Aluno updateAluno = alunoService.upadate(alunoCodParam, aluno.toModel(), file);

		return ResponseEntity.ok(new AlunoUpdateDto(updateAluno));
	}

	@DeleteMapping("/{codMatricula}")
	public ResponseEntity<String> deleteAluno(@PathVariable("codMatricula") String codMatricula) {
		alunoService.delete(codMatricula);

		return ResponseEntity.ok("aluno deletado com sucesso");
	}

	@GetMapping("/{codMatricula}/buscar-turmas")
	public ResponseEntity<List<AulaViewerDto>> getTurmas(@PathVariable("codMatricula") String codMatricula) {
		var aulas = alunoService.getAulas(codMatricula);
		var aulasDto = aulas.stream().map(AulaViewerDto::new).collect(Collectors.toList());

		return ResponseEntity.ok(aulasDto);
	}

	@PostMapping("/{codMatricula}/adicionar-avaliacao")
	public ResponseEntity<Object> addAvaliacao(@PathVariable("codMatricula") String codMatricula,
			@Valid @RequestBody AvaliacaoCreateDto avaliacao) {
		alunoService.addAvaliacaoFisica(codMatricula, avaliacao.toModel());

		return ResponseEntity.ok(avaliacao);
	}

	@GetMapping("/{codMatricula}/buscar-avaliacoes")
	public ResponseEntity<List<AvaliacaoViewerDto>> getAvaliacoes(@PathVariable("codMatricula") String codMatricula) {
		var avaliacoes = alunoService.getAvaliacoesFisica(codMatricula);
		var avaliacoesDto = avaliacoes.stream().map(AvaliacaoViewerDto::new).collect(Collectors.toList());

		return ResponseEntity.ok(avaliacoesDto);
	}

	@DeleteMapping("{codMatricula}/remover-turma/{turmaId}")
	public ResponseEntity<String> removeTurma(@PathVariable("codMatricula") String codMatricula,
			@PathVariable("turmaId") Long turmaId) {
		alunoService.removeTurma(codMatricula, turmaId);
		return ResponseEntity.ok("turma removida com sucesso");
	}

	@DeleteMapping("/{codMatricula}/remover-avaliacao/{avaliacaoId}")
	public ResponseEntity<String> removeAvaliacao(@PathVariable("avaliacaoId") Long avaliacaoId,
			@PathVariable("codMatricula") String codMatricula) {
		alunoService.removeAvaliacao(codMatricula, avaliacaoId);
		return ResponseEntity.ok("avaliação removida com sucesso.");
	}
}