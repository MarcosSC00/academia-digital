package com.myprojects.digitalacademy.domain.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity(name="tb_aluno")
public class Aluno {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private Sexo sexo;
	
	@Column(name = "data_nascimento")
	private LocalDate dataDeNascimento;
	
	private String telefone;
	
	private String email;
	
	private String endereco;
	
	@Column(name = "data_matricula")
	private LocalDate dataMatricula;
	
	@Column(unique = true, nullable = false)
	private String codMatricula;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "aluno")
	private List<AvaliacaoFisica> avaliacoesFisicas = new ArrayList<>();
	
	@ManyToMany(mappedBy = "alunos")
	private List<Aula> aulas;
	
	@Column(name = "image_profile")
	private String imageProfile;
	
	public Aluno() {
		super();
	}

	public Aluno(Long id, String name, Sexo sexo, LocalDate dataDeNascimento, String telefone, String email,
			String endereco, LocalDate dataMatricula) {
		super();
		this.id = id;
		this.name = name;
		this.sexo = sexo;
		this.dataDeNascimento = dataDeNascimento;
		this.telefone = telefone;
		this.email = email;
		this.endereco = endereco;
		this.dataMatricula = dataMatricula;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDataDeNascimento() {
		return dataDeNascimento;
	}

	public void setDataDeNascimento(LocalDate dataDeNascimento) {
		this.dataDeNascimento = dataDeNascimento;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public LocalDate getDataMatricula() {
		return dataMatricula;
	}

	public void setDataMatricula(LocalDate dataMatricula) {
		this.dataMatricula = dataMatricula;
	}

	public String getCodMatricula() {
		return codMatricula;
	}

	public void setCodMatricula(String codMatricula) {
		this.codMatricula = codMatricula;
	}

	public List<AvaliacaoFisica> getAvaliacoesFisicas() {
		return avaliacoesFisicas;
	}

	public void setAvaliacoesFisicas(List<AvaliacaoFisica> avaliacoesFisicas) {
		this.avaliacoesFisicas = avaliacoesFisicas;
	}

	public List<Aula> getAulas() {
		return aulas;
	}

	public void setAulas(List<Aula> aulas) {
		this.aulas = aulas;
	}
	
	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public String getImageProfile() {
		return imageProfile;
	}

	public void setImageProfile(String imageProfile) {
		this.imageProfile = imageProfile;
	}

	public enum Sexo {
		MASCULINO, FEMININO;
	}
}
