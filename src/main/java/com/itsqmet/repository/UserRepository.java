package com.itsqmet.repository;

import com.itsqmet.entity.User;
import com.itsqmet.role.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByUsername(String username);
    // Nuevos métodos para docentes
    List<User> findByRol(Rol rol);
    List<User> findByNombreContainingIgnoreCaseAndRol(String nombre, Rol rol);
    List<User> findByMateriaContainingIgnoreCaseAndRol(String materia, Rol rol);
    List<User> findByNombreContainingIgnoreCaseAndMateriaContainingIgnoreCaseAndRol(String nombre, String materia, Rol rol);
}