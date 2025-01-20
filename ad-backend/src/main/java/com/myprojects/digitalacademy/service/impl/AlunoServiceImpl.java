package com.myprojects.digitalacademy.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.AvaliacaoFisica;
import com.myprojects.digitalacademy.domain.repository.AlunoRepository;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;
import com.myprojects.digitalacademy.domain.repository.AvaliacaoFisicaRepository;
import com.myprojects.digitalacademy.service.AlunoService;
import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.exception.NotFoundException;

import jakarta.transaction.Transactional;

@Service
public class AlunoServiceImpl implements AlunoService {

	private final AlunoRepository alunoRepository;
	private final AulaRepository aulaRepository;
	private final AvaliacaoFisicaRepository avaliacaoRep;

	@Value("${aluno.profile.images.directory}")
	private String directory;

	@Value("${img.profile.default}")
	private String defaultImageDirectory;

	public AlunoServiceImpl(AlunoRepository alunoRepository, AulaRepository aulaRepository,
			AvaliacaoFisicaRepository avaliacaoRep) {
		this.alunoRepository = alunoRepository;
		this.aulaRepository = aulaRepository;
		this.avaliacaoRep = avaliacaoRep;
	}

	@Override
	public Aluno create(Aluno alunoToCreate, MultipartFile file) {

		if (alunoRepository.existsByEmail(alunoToCreate.getEmail())) {
			throw new BusinessException("Já existe um aluno com este email.");
		}

		alunoToCreate.setDataMatricula(LocalDate.now());
		alunoToCreate.setCodMatricula(generetCode());

		try {
			if (file != null && !file.isEmpty()) {
				String fileName = saveImage(file);
				alunoToCreate.setImageProfile(fileName);
			} else {
				alunoToCreate.setImageProfile(Paths.get(defaultImageDirectory).getFileName().toString());
			}
		} catch (IOException ex) {
			throw new RuntimeException("erro ao salvar a imagem do perfil", ex);
		}

		return alunoRepository.save(alunoToCreate);
	}

	@Override
	public Aluno upadate(String codMatricula, Aluno alunoToUpdate, MultipartFile file) {
		Aluno existingAluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("aluno não encontrado."));

		existingAluno.setName(alunoToUpdate.getName());
		existingAluno.setSexo(alunoToUpdate.getSexo());
		existingAluno.setTelefone(alunoToUpdate.getTelefone());
		existingAluno.setEndereco(alunoToUpdate.getEndereco());
		existingAluno.setDataDeNascimento(alunoToUpdate.getDataDeNascimento());
		
		try {
			if (file != null && !file.isEmpty()) {
				String fileName = saveImage(file);
				existingAluno.setImageProfile(fileName);
			}
		} catch (IOException ex) {
			throw new RuntimeException("erro ao salvar a imagem do perfil", ex);
		}
		
		boolean emailExists = alunoRepository.existsByEmailAndCodMatriculaNot(alunoToUpdate.getEmail(), codMatricula);
	    if (emailExists) {
	        throw new BusinessException("Já existe um aluno com este e-mail.");
	    }
	    existingAluno.setEmail(alunoToUpdate.getEmail());

		return alunoRepository.save(existingAluno);
	}

	@Override
	public void delete(String codMatricula) {
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("aluno não encontrado."));
		alunoRepository.delete(aluno);
	}

	@Override
	public Aluno getById(Long alunoId) {
		return alunoRepository.findById(alunoId).orElseThrow(() -> new NotFoundException("aluno não encontrado"));
	}

	@Override
	public Aluno getByCodMatricula(String codMatricula) {
		return alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("aluno não encontrado"));
	}

	@Override
	public AvaliacaoFisica addAvaliacaoFisica(String codMatricula, AvaliacaoFisica avaliacao) {
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new BusinessException("Aluno não encontrado."));
		if (avaliacao == null) {
			throw new BusinessException("avaliação inválida.");
		}

		avaliacao.setAluno(aluno);
		avaliacao.setDataAvaliacao(LocalDate.now());
		avaliacao.setResultado(resultAvaliacao(avaliacao.getPeso(), avaliacao.getAltura()).toString());
		aluno.getAvaliacoesFisicas().add(avaliacao);

		return avaliacaoRep.save(avaliacao);
	}

	@Override
	@Transactional
	public void addAula(String codMatricula, Long aulaId) {

		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("aluno não encontrado."));

		Aula aula = aulaRepository.findById(aulaId).orElseThrow(() -> new NotFoundException("Aula não encontrada."));
		boolean aulaCadastrada = aluno.getAulas().stream().anyMatch(a -> a.getId().equals(aulaId));

		if (aulaCadastrada) {
			throw new BusinessException("aula já cadastrada.");
		}

		aula.getAlunos().add(aluno);
		aluno.getAulas().add(aula);

		alunoRepository.save(aluno);
		aulaRepository.saveAndFlush(aula);
	}

	@Override
	public List<Aula> getAulas(String codMatricula) {
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new BusinessException("aluno não encontrado."));

		var aulasInAluno = aluno.getAulas();
		if(aulasInAluno != null && !aulasInAluno.isEmpty()) {
			return aulasInAluno;
		}else {
			return new ArrayList<>();
		}
	}

	@Override
	public List<Aluno> getAll() {
		return Optional.ofNullable(alunoRepository.findAll())
				.orElseThrow(() -> new BusinessException("Nenhum aluno encontrado!"));
	}

	@Override
	public List<AvaliacaoFisica> getAvaliacoesFisica(String codMatricula) {
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new BusinessException("aluno não encontrado."));

		var avaliacoesInAluno = Optional.ofNullable(aluno.getAvaliacoesFisicas())
				.orElseThrow(() -> new BusinessException("nenhuma avaliação encontrada."));
		if (avaliacoesInAluno.isEmpty()) {
			throw new BusinessException("nenhuma avaliação encontrada.");
		}
		return avaliacoesInAluno;
	}

	@Override
	public void removeTurma(String codMatricula, Long turmaId) {
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
	            .orElseThrow(() -> new BusinessException("aluno não encontrado."));
	    
	    Aula turma = aulaRepository.findById(turmaId)
	            .orElseThrow(() -> new BusinessException("turma não encontrada."));

	    boolean removedFromAluno = aluno.getAulas().remove(turma);
	    boolean removedFromTurma = turma.getAlunos().remove(aluno);
		
		if (!removedFromAluno || !removedFromTurma) {
	        throw new BusinessException("Turma não encontrada para este aluno.");
	    }
		
		alunoRepository.save(aluno);
	}

	@Override
	public void removeAvaliacao(String codMatricula, Long avaliacaoId) {
		
		Aluno aluno = alunoRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new BusinessException("aluno não encontrado"));
		
		if(aluno.getAvaliacoesFisicas() != null) {
			aluno.getAvaliacoesFisicas().removeIf((av -> av.getId().equals(avaliacaoId)));
		}
		
		alunoRepository.save(aluno);
	}

	public Map<String, Double> resultAvaliacao(double peso, double altura) {
		double imc = peso / (altura * altura);
		double pgc = 0d;
		String sexo = "masculino";
		int idade = 32;

		Map<String, Double> result = new HashMap<>();
		if (sexo == "masculino") {
			pgc = (1.2 * imc) + (0.23 * idade) - 16.2;
		} else if (sexo == "feminino") {
			pgc = (1.2 * imc) + (0.23 * idade) - 5.4;
		}
		result.put("imc", imc);
		result.put("pgc", pgc);

		return result;
	}

	public String saveImage(MultipartFile imagemPerfil) throws IOException {
		String fileName = UUID.randomUUID().toString().substring(0, 4) + "_" + imagemPerfil.getOriginalFilename();
		Path filePath = Paths.get(directory + File.separator + fileName);

		Files.createDirectories(filePath.getParent());
		Files.write(filePath, imagemPerfil.getBytes());

		return fileName;
	}

	public String generetCode() {
		String code;
		do {
			code = UUID.randomUUID().toString().substring(0, 6);
		} while (alunoRepository.existsByCodMatricula(code));
		return code;
	}

}