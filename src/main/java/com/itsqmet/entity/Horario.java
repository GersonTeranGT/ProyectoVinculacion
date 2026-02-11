package com.itsqmet.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "horarios")
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String curso;
    private String paralelo;
    private String materia;

    @ManyToOne
    @JoinColumn(name = "docente_id")
    private Docente docente;

    private String diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String jornada;

    public Horario() {
    }

    public Horario(String curso, String paralelo, String materia, Docente docente, String diaSemana, LocalTime horaInicio, LocalTime horaFin, String jornada) {
        this.curso = curso;
        this.paralelo = paralelo;
        this.materia = materia;
        this.docente = docente;
        this.diaSemana = diaSemana;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.jornada = jornada;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }
    public String getParalelo() { return paralelo; }
    public void setParalelo(String paralelo) { this.paralelo = paralelo; }
    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
    public Docente getDocente() { return docente; }
    public void setDocente(Docente docente) { this.docente = docente; }
    public String getDiaSemana() { return diaSemana; }
    public void setDiaSemana(String diaSemana) { this.diaSemana = diaSemana; }
    public LocalTime getHoraInicio() { return horaInicio; }
    public void setHoraInicio(LocalTime horaInicio) { this.horaInicio = horaInicio; }
    public LocalTime getHoraFin() { return horaFin; }
    public void setHoraFin(LocalTime horaFin) { this.horaFin = horaFin; }
    public String getJornada() { return jornada; }
    public void setJornada(String jornada) { this.jornada = jornada; }
}