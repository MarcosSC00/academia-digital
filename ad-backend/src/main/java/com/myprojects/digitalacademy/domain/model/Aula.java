package com.myprojects.digitalacademy.domain.model;

import java.util.List;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity(name="tb_aula")
public class Aula {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	private String horario;
	
	@ElementCollection(targetClass = DiasSemana.class)
	@CollectionTable(name="dias_semana", joinColumns = @JoinColumn(name="id"))
	@Enumerated(EnumType.STRING)
	@Column(name = "dia_semana")
	private Set<DiasSemana> diasSemana;

	@ManyToOne
	private Instrutor instrutor;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "aula_id",
			joinColumns = @JoinColumn(name="aula_id"),
			inverseJoinColumns = @JoinColumn(name="aluno_id")
	)
	private List<Aluno> alunos;
	
	public Aula() {
		super();
	}

	public Aula(Long id, String name, String horario, Set<DiasSemana> diasSemana) {
		super();
		this.id = id;
		this.name = name;
		this.horario = horario;
		this.diasSemana = diasSemana;
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

	public void setHorario(String horario) {
		this.horario = horario;
	}
	
	public String getHorario() {
		return horario;
	}
	
	public Set<DiasSemana> getDiasSemana() {
		return diasSemana;
	}

	public void setDiasSemana(Set<DiasSemana> diasSemana) {
		this.diasSemana = diasSemana;
	}

	public Instrutor getInstrutor() {
		return instrutor;
	}

	public void setInstrutor(Instrutor instrutor) {
		this.instrutor = instrutor;
	}

	public List<Aluno> getAlunos() {
		return alunos;
	}

	public void setAlunos(List<Aluno> alunos) {
		this.alunos = alunos;
	}
	
	public enum DiasSemana{
		SEGUNDA,TERCA,QUARTA,QUINTA,SEXTA,SABADO
	}

}
