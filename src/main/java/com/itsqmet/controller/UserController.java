package com.itsqmet.controller;

import com.itsqmet.entity.User;
import com.itsqmet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public String listaUsers(Model model){
        model.addAttribute("users", userRepository.findAll());
        return "pages/listaUsers";
    }

    @GetMapping("/listaUsers")
    public String listaUsersNavbar(Model model){
        model.addAttribute("users", userRepository.findAll());
        return "pages/listaUsers";
    }

    @GetMapping("/usuarios/formUsuario")
    public String mostrarFormulario(Model model){
        model.addAttribute("user", new User());
        return "pages/formUser";
    }

    @PostMapping("/usuarios/guardar")
    public String guardarUsuario(@ModelAttribute User user){
        userRepository.save(user);
        return "redirect:/listaUsers";
    }
}