package com.itsqmet.service;

import com.itsqmet.entity.User;
import com.itsqmet.repository.UserRepository;
import com.itsqmet.role.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void guardarUsuario(User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            user.setUsername(user.getNombre().toLowerCase().replace(" ", "") + (int) (Math.random() * 100));
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("1234");
        }
        if (user.getRol() == null) {
            user.setRol(Rol.ROLE_DOCENTE);
        }
        userRepository.save(user);
    }

    public List<User> listarUsuarios() {
        return userRepository.findAll();
    }
}