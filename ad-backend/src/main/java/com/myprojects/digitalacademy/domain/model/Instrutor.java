package com.myprojects.digitalacademy.domain.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name="tb_instrutor")
public class Instrutor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String telefone;
	
	private String email;
	
	@Column(name = "cod_matricula")
	private String codMatricula;
	
	private List<String> especialidades;	
	
	@Column(name = "image_profile")
	private String imageProfile;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "instrutor", orphanRemoval = true)
	private List<Aula> aulas;

	public Instrutor() {
		super();
	}

	public Instrutor(Long id, String name, String telefone, String email, List<String> especialidades) {
		super();
		this.id = id;
		this.name = name;
		this.telefone = telefone;
		this.email = email;
		this.especialidades = especialidades;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getCodMatricula() {
		return codMatricula;
	}

	public void setCodMatricula(String codMatricula) {
		this.codMatricula = codMatricula;
	}

	public List<String> getEspecialidades() {
		return especialidades;
	}

	public void setEspecialidades(List<String> especialidades) {
		this.especialidades = especialidades;
	}

	public List<Aula> getAulas() {
		return aulas;
	}

	public String getImageProfile() {
		return imageProfile;
	}

	public void setImageProfile(String imageProfile) {
		this.imageProfile = imageProfile;
	}

	public void setAulas(List<Aula> aulas) {
		this.aulas = aulas;
	}

	public void removeTurma(Aula aula) {
		aulas.remove(aula);
		aula.setInstrutor(null);
	}
}
