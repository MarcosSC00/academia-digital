package com.myprojects.digitalacademy.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.myprojects.digitalacademy.domain.dto.auladto.AulaCreateDto;
import com.myprojects.digitalacademy.domain.model.Aluno;
import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Instrutor;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;
import com.myprojects.digitalacademy.domain.repository.InstrutorRepository;
import com.myprojects.digitalacademy.service.AulaService;
import com.myprojects.digitalacademy.service.exception.BusinessException;

@Service
public class AulaServiceImpl implements AulaService {

	private final AulaRepository aulaRepository;
	private final InstrutorRepository instRepository;

	public AulaServiceImpl(AulaRepository aulaRepository, InstrutorRepository instRepository) {
		this.aulaRepository = aulaRepository;
		this.instRepository = instRepository;
	}

	@Override
	public Aula create(AulaCreateDto aulaDto) {

		Instrutor instrutor = instRepository.findByCodMatricula(aulaDto.instrutorCode())
				.orElseThrow(() -> new BusinessException("instrutor não encontrado."));

		Aula aula = aulaDto.toModel();
		aula.setInstrutor(instrutor);

		boolean isEqualTimes = aulaRepository.existsClassWithSameTimeAndDays(aula.getHorario(), aula.getDiasSemana());
		boolean hasSpecialty = instrutor.getEspecialidades()
				.stream().anyMatch((e) -> e.toLowerCase().equals(aula.getName().toLowerCase()));
		boolean isRegistred = aulaRepository.existsByName(aula.getName());

		if (isEqualTimes) {
			throw new BusinessException("Horário indisponível.");
		} else if (!hasSpecialty) {
			throw new BusinessException("O instrutor não é apto para esta aula.");
		} else if (isRegistred) {
			throw new BusinessException("aula já cadastrada.");
		}

		return aulaRepository.save(aula);
	}

	@Override
	public Aula update(Long aulaId, Long instrutorId, Aula newAula) {
		Aula aulaToUpdate = getById(aulaId);
		Instrutor instrutor = getInstrutor(instrutorId);

		aulaToUpdate.setName(newAula.getName());
		aulaToUpdate.setHorario(newAula.getHorario());
		aulaToUpdate.setDiasSemana(newAula.getDiasSemana());
		aulaToUpdate.setInstrutor(instrutor);

		boolean exist = aulaRepository.existsClassWithSameTimeAndDays(aulaToUpdate.getHorario(),
				aulaToUpdate.getDiasSemana());
		boolean hasSpecialty = instrutor.getEspecialidades().contains(aulaToUpdate.getName());

		if (exist) {
			throw new BusinessException("Horário indisponível.");
		} else if (!hasSpecialty) {
			throw new BusinessException("O instrutor não é apto para esta aula.");
		}

		return aulaRepository.saveAndFlush(aulaToUpdate);
	}

	@Override
	public Instrutor getInstrutor(Long id) {
		Aula aula = aulaRepository.findById(id).orElseThrow(() -> new BusinessException("aula não encontrada."));
		return aula.getInstrutor();
	}

	@Override
	public List<Aluno> getAlunos(Long id) {
		Aula aula = aulaRepository.findById(id).orElseThrow(() -> new BusinessException("aula não encontrada."));
		List<Aluno> alunos = aula.getAlunos();
		if (alunos == null || alunos.isEmpty()) {
			throw new BusinessException("nenhum aluno cadastrado");
		}
		return alunos;
	}

	@Override
	public void delete(Long aulaId) {
		aulaRepository.findById(aulaId).orElseThrow(() -> new BusinessException("aula não encontrada."));
		aulaRepository.deleteById(aulaId);
	}

	@Override
	public Aula getById(Long aulaId) {
		Aula aula = aulaRepository.findById(aulaId).orElseThrow(() -> new BusinessException("aula não encontrada."));
		return aula;
	}

	@Override
	public List<Aula> getAll() {
		return Optional.ofNullable(aulaRepository.findAll())
				.orElseThrow(() -> new BusinessException("nenhuma aula encontrada."));
	}

}
