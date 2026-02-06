package com.itsqmet.entity;

import com.itsqmet.role.Rol;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    @NotBlank(message = "La materia es obligatoria")
    private String materia;

    @NotBlank(message = "El curso asignado es obligatorio")
    private String cursoAsignado;

    @NotBlank(message = "La jornada es obligatoria")
    private String jornada;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Debe ingresar un formato de correo válido")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "^0[0-9]{9}$", message = "El teléfono debe empezar con 0 y tener 10 dígitos")
    private String telefono;
}