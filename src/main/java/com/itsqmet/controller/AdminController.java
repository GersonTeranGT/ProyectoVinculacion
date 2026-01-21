package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    // Panel principal
    @GetMapping
    public String panelAdmin() {
        return "pages/panelAdmin";
    }

    // Docentes
    @GetMapping("/docentes")
    public String docentes() {
        return "pages/listaDocente";
    }

    // Cursos
    @GetMapping("/cursos")
    public String cursos() {
        return "pages/cursos";
    }

    // Usuarios
    @GetMapping("/usuarios")
    public String usuarios() {
        return "pages/listaUsers";
    }
}
