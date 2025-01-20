package com.myprojects.digitalacademy.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.myprojects.digitalacademy.domain.model.Aula;
import com.myprojects.digitalacademy.domain.model.Instrutor;
import com.myprojects.digitalacademy.domain.repository.AulaRepository;
import com.myprojects.digitalacademy.domain.repository.InstrutorRepository;
import com.myprojects.digitalacademy.service.InstrutorService;
import com.myprojects.digitalacademy.service.exception.BusinessException;
import com.myprojects.digitalacademy.service.exception.NotFoundException;

import jakarta.transaction.Transactional;

@Service
public class InstrutorServiceImpl implements InstrutorService {

	private final InstrutorRepository instRepository;
	private final AulaRepository aulaRepository;

	@Value("${instrutor.profile.images.directory}")
	private String directory;

	@Value("${img.profile.default}")
	private String defaultImageDirectory;

	public InstrutorServiceImpl(InstrutorRepository instRepository, AulaRepository aulaRepository) {
		this.instRepository = instRepository;
		this.aulaRepository = aulaRepository;
	}

	@Override
	public Instrutor create(Instrutor instrutorToCreate, MultipartFile file) {
		if (instRepository.existsByEmail(instrutorToCreate.getEmail())) {
			throw new BusinessException("email já cadastrado.");
		}
		
		instrutorToCreate.setCodMatricula(generetCode());
		
		try {
			if (file != null && !file.isEmpty()) {
				String fileName = saveImage(file);
				instrutorToCreate.setImageProfile(fileName);
			} else {
				String fileDefaultImageName = Paths.get(defaultImageDirectory).getFileName().toString();
				instrutorToCreate.setImageProfile(fileDefaultImageName);
			}

		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return instRepository.save(instrutorToCreate);
	}

	@Override
	public Instrutor update(String codMatricula, Instrutor instrutorToUpdate, MultipartFile file) {
		Instrutor existingInstrutor = instRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado."));

		existingInstrutor.setEmail(instrutorToUpdate.getEmail());
		existingInstrutor.setEspecialidades(instrutorToUpdate.getEspecialidades());
		existingInstrutor.setName(instrutorToUpdate.getName());
		existingInstrutor.setTelefone(instrutorToUpdate.getTelefone());
		existingInstrutor.setCodMatricula(generetCode());

		try {
			if (file != null && !file.isEmpty()) {
				String fileName = saveImage(file);
				existingInstrutor.setImageProfile(fileName);
			}
		} catch (IOException ex) {
			throw new RuntimeException("erro ao salvar a imagem do perfil", ex);
		}
		
		boolean emailExists = instRepository.existsByEmailAndCodMatriculaNot(instrutorToUpdate.getEmail(), codMatricula);
	    if (emailExists) {
	        throw new BusinessException("Já existe um aluno com este e-mail.");
	    }
	    existingInstrutor.setEmail(instrutorToUpdate.getEmail());

		return instRepository.save(existingInstrutor);
	}

	@Override
	public void delete(String codInstrutor) {
		Instrutor instrutor = instRepository.findByCodMatricula(codInstrutor)
				.orElseThrow(() -> new BusinessException("instrutor não encontrado."));
		instRepository.delete(instrutor);
	}

	@Override
	public Instrutor getById(Long instrutorId) {
		return instRepository.findById(instrutorId)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado"));
	}

	@Override
	public Instrutor getByName(String name) {
		return instRepository.findByName(name)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado."));
	}
	
	@Override
	public Instrutor getByCodMatricula(String codMatricula) {
		return instRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado."));
	}

	@Override
	public List<Instrutor> getAll() {
		return Optional.ofNullable(instRepository.findAll())
				.orElseThrow(() -> new NotFoundException("nenhum instrutor encontrado."));
	}

	@Override
	public void addAula(Long aulaId, String codMatricula) {
		Aula aula = aulaRepository.findById(aulaId)
				.orElseThrow(() -> new NotFoundException("aula não encontrada."));
		
		Instrutor instrutor = instRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado."));
		
		boolean isAulaRegistred = instrutor.getAulas().contains(aula);

		if (isAulaRegistred) {
			throw new BusinessException("aula já cadastrada.");
		}

		instrutor.getAulas().add(aula);
		instRepository.save(instrutor);
	}

	@Override
	public List<Aula> getAulas(String codMatricula) {
		Instrutor instrutor = instRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado"));
		List<Aula> aulas = new ArrayList<>(instrutor.getAulas());
		if (aulas == null || aulas.isEmpty()) {
			return new ArrayList<>();
		}
		return aulas;
	}
	
	@Transactional
	@Override
	public void removeTurma(String codMatricula, Long turmaId) {
		Instrutor instrutor = instRepository.findByCodMatricula(codMatricula)
				.orElseThrow(() -> new NotFoundException("instrutor não encontrado"));
		Aula aula = instrutor.getAulas().stream().filter((a) -> a.getId()
				.equals(turmaId)).findFirst().orElseThrow(() -> new BusinessException("Aula não encontrada."));
		
		instrutor.removeTurma(aula);
		instRepository.save(instrutor);
	}

	public String saveImage(MultipartFile imagemPerfil) throws IOException {
		String fileName = UUID.randomUUID().toString().substring(0, 4) + imagemPerfil.getOriginalFilename();
		Path filePath = Paths.get(directory + File.separator + fileName);

		Files.createDirectories(filePath.getParent());
		Files.write(filePath, imagemPerfil.getBytes());

		return fileName;
	}

	public String generetCode() {
		String code;
		do {
			code = UUID.randomUUID().toString().substring(0, 6);
		} while (instRepository.existsByCodMatricula(code));
		return code;
	}

}
