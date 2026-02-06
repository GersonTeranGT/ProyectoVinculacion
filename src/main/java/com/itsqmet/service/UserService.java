package com.itsqmet.service;

import com.itsqmet.entity.User;
import com.itsqmet.repository.UserRepository;
import com.itsqmet.role.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        Collection<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRol().name())
        );

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }

    public List<User> listarUsuarios() {
        return userRepository.findAll();
    }

    public Optional<User> buscarPorId(Long id) {
        return userRepository.findById(id);
    }

    public void eliminarUsuario(Long id) {
        userRepository.deleteById(id);
    }

    public void guardarUsuario(User user) {
        // Si es un nuevo usuario (sin ID)
        if (user.getId() == null) {
            // Generar username válido si no existe
            if (user.getUsername() == null || user.getUsername().isEmpty()) {
                user.setUsername(generarUsernameValido(user.getEmail()));
            }

            // Asignar contraseña por defecto si no existe
            if (user.getPassword() == null || user.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode("12345")); // Usar BCrypt
            }

            // Asignar rol si no existe
            if (user.getRol() == null) {
                user.setRol(Rol.ROLE_DOCENTE);
            }
        } else {
            // Si es edición (tiene ID), buscar el usuario existente
            Optional<User> usuarioExistente = userRepository.findById(user.getId());
            if (usuarioExistente.isPresent()) {
                User existente = usuarioExistente.get();

                // Mantener el username original (no generar uno nuevo)
                user.setUsername(existente.getUsername());

                // Mantener la contraseña original si no se está cambiando
                if (user.getPassword() == null || user.getPassword().isEmpty()) {
                    user.setPassword(existente.getPassword());
                } else if (!user.getPassword().equals(existente.getPassword())) {
                    // Si se cambió la contraseña, encriptarla
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                }

                // Mantener el rol original
                if (user.getRol() == null) {
                    user.setRol(existente.getRol());
                }
            }
        }

        userRepository.save(user);
    }

    private String generarUsernameValido(String email) {
        if (email == null || email.isEmpty()) {
            return "docente" + (int) (Math.random() * 10000);
        }

        // Tomar la parte antes del @
        String username = email.split("@")[0].toLowerCase();

        // Limpiar caracteres no permitidos
        username = limpiarUsername(username);

        // Asegurar longitud
        if (username.length() < 3) {
            username = username + "doc";
        }
        if (username.length() > 20) {
            username = username.substring(0, 20);
        }

        return username;
    }

    private String limpiarUsername(String username) {
        if (username == null) return "docente" + (int) (Math.random() * 10000);

        // Convertir a minúsculas
        username = username.toLowerCase();

        // Reemplazar espacios y caracteres especiales
        username = username.replaceAll("\\s+", "_"); // espacios por _
        username = username.replaceAll("[^a-z0-9._-]", ""); // eliminar caracteres inválidos

        // Reemplazar múltiples puntos/guiones consecutivos por uno solo
        username = username.replaceAll("\\.+", ".");
        username = username.replaceAll("_+", "_");
        username = username.replaceAll("-+", "-");

        // Eliminar puntos/guiones al inicio o final
        username = username.replaceAll("^[._-]+", "");
        username = username.replaceAll("[._-]+$", "");

        // Asegurar longitud mínima
        if (username.length() < 3) {
            username = "doc_" + username;
        }

        // Asegurar longitud máxima
        if (username.length() > 20) {
            username = username.substring(0, 20);
        }

        return username;
    }

    public List<User> listarDocentes() {
        return userRepository.findByRol(Rol.ROLE_DOCENTE);
    }

    public List<User> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isEmpty()) {
            return listarDocentes();
        }
        return userRepository.findByNombreContainingIgnoreCaseAndRol(nombre, Rol.ROLE_DOCENTE);
    }

    public List<User> buscarPorMateria(String materia) {
        if (materia == null || materia.isEmpty()) {
            return listarDocentes();
        }
        return userRepository.findByMateriaContainingIgnoreCaseAndRol(materia, Rol.ROLE_DOCENTE);
    }

    public List<User> buscarPorNombreYMateria(String nombre, String materia) {
        if ((nombre == null || nombre.isEmpty()) && (materia == null || materia.isEmpty())) {
            return listarDocentes();
        } else if (nombre == null || nombre.isEmpty()) {
            return buscarPorMateria(materia);
        } else if (materia == null || materia.isEmpty()) {
            return buscarPorNombre(nombre);
        } else {
            return userRepository.findByNombreContainingIgnoreCaseAndMateriaContainingIgnoreCaseAndRol(
                    nombre, materia, Rol.ROLE_DOCENTE);
        }
    }
}