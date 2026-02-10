package com.itsqmet.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Docente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String email;
    private String cursoAsignado;
    private String jornada;
    private String materia;
    private String telefono;
}
