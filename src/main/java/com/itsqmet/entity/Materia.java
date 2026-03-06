package com.itsqmet.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;
}