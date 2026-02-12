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
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

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

    // --- MÉTODOS QUE FALTABAN PARA EL DOCENTE CONTROLLER ---

    public List<User> listarUsuarios() {
        return userRepository.findAll();
    }

    public void eliminarUsuario(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> buscarPorId(Long id) {
        return userRepository.findById(id);
    }
}