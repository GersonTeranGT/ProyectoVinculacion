package com.itsqmet.controller;

import com.itsqmet.entity.User;
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
    @GetMapping("/listaDocentes")
    public String lista(){
        return "pages/listaDocente";
    }

    @GetMapping("/nuevoDocente")
    public String formulario(){
        return "pages/formularioDocente";
    }

//    @GetMapping("/admin/nuevoDocente")
//    public String form(Model model) {
//        model.addAttribute("docente", new User());
//        return "pages/formularioDocente";
//    }
//
//    @PostMapping("/admin/guardarDocente")
//    public String guardarDocente(@ModelAttribute("docente") User docente) {
//        userService.guardarUsuario(docente);
//        return "redirect:/listaDocente";
//    }
//
//    @GetMapping("/listaDocente")
//    public String mostrarListaDocente(Model model) {
//        List<User> usuarios = userService.listarUsuarios();
//        model.addAttribute("docentes", usuarios);
//        return "pages/listaDocente";
//    }
}