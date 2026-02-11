package com.itsqmet.controller;

import com.itsqmet.entity.User;
import com.itsqmet.role.Rol;
import com.itsqmet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class DocenteController {

    @Autowired
    private UserService userService;

    // --- 1. MOSTRAR LISTA ---
    @GetMapping("/listaDocentes")
    public String mostrarListaDocente(Model model) {
        List<User> usuarios = userService.listarUsuarios();
        model.addAttribute("docentes", usuarios);
        return "pages/listaDocente";
    }

    // --- 2. FORMULARIO NUEVO ---
    @GetMapping("/nuevoDocente")
    public String form(Model model) {
        model.addAttribute("docente", new User());
        return "pages/formularioDocente";
    }

    // --- 3. GUARDAR (CORREGIDO ERROR DEL @) ---
    @PostMapping("/guardarDocente")
    public String guardarDocente(@ModelAttribute("docente") User docente) {

        // Si el usuario viene vacío, crearlo desde el email SIN el @
        if (docente.getUsername() == null || docente.getUsername().isEmpty()) {
            String email = docente.getEmail();
            if (email != null && email.contains("@")) {
                docente.setUsername(email.split("@")[0]); // "juan@gmail.com" -> "juan"
            } else {
                docente.setUsername(email);
            }
        }

        // Contraseña por defecto para nuevos o recuperación para existentes
        if (docente.getId() == null) {
            docente.setPassword("12345");
        } else {
            if (docente.getPassword() == null || docente.getPassword().isEmpty()) {
                docente.setPassword("12345");
            }
        }

        docente.setRol(Rol.ROLE_DOCENTE);
        userService.guardarUsuario(docente);
        return "redirect:/listaDocentes";
    }

    // --- 4. IR A EDITAR ---
    @GetMapping("/docentes/editar/{id}")
    public String editarDocente(@PathVariable Long id, Model model) {
        Optional<User> docente = userService.buscarPorId(id);
        if (docente.isPresent()) {
            model.addAttribute("docente", docente.get());
            return "pages/formularioDocente";
        } else {
            return "redirect:/listaDocentes";
        }
    }

    // --- 5. ELIMINAR ---
    @GetMapping("/docentes/eliminar/{id}")
    public String eliminarDocente(@PathVariable Long id) {
        userService.eliminarUsuario(id);
        return "redirect:/listaDocentes";
    }
}