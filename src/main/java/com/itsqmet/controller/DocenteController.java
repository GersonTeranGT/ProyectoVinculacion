package com.itsqmet.controller;

import com.itsqmet.entity.User;
import com.itsqmet.role.Rol;
import com.itsqmet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class DocenteController {

    @Autowired
    private UserService userService;

    @GetMapping("/nuevoDocente")
    public String form(Model model) {
        model.addAttribute("docente", new User());
        return "pages/formularioDocente";
    }

    @PostMapping("/guardarDocente")
    public String guardarDocente(@ModelAttribute("docente") User docente) {
        if (docente.getUsername() == null || docente.getUsername().isEmpty()) {
            docente.setUsername(docente.getEmail());
        }
        docente.setPassword("12345");
        docente.setRol(Rol.ROLE_DOCENTE);
        userService.guardarUsuario(docente);
        return "redirect:/listaDocentes";
    }

    @GetMapping("/listaDocentes")
    public String mostrarListaDocente(Model model) {
        List<User> usuarios = userService.listarUsuarios();
        model.addAttribute("docentes", usuarios);
        return "pages/listaDocente";
    }
}