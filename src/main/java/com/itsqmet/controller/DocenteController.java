package com.itsqmet.controller;

import com.itsqmet.entity.User;
import com.itsqmet.role.Rol;
import com.itsqmet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.Optional;

@Controller
public class DocenteController {

    @Autowired
    private UserService userService;

    @GetMapping("/listaDocentes")
    public String mostrarListaDocente(
            @RequestParam(name = "buscarNombre", required = false, defaultValue = "") String buscarNombre,
            @RequestParam(name = "buscarMateria", required = false, defaultValue = "") String buscarMateria,
            Model model) {

        List<User> docentes;

        if (!buscarNombre.isEmpty() && !buscarMateria.isEmpty()) {
            docentes = userService.buscarPorNombreYMateria(buscarNombre, buscarMateria);
        } else if (!buscarNombre.isEmpty()) {
            docentes = userService.buscarPorNombre(buscarNombre);
        } else if (!buscarMateria.isEmpty()) {
            docentes = userService.buscarPorMateria(buscarMateria);
        } else {
            docentes = userService.listarDocentes();
        }

        model.addAttribute("buscarNombre", buscarNombre);
        model.addAttribute("buscarMateria", buscarMateria);
        model.addAttribute("docentes", docentes);
        return "pages/listaDocente";
    }

    @GetMapping("/nuevoDocente")
    public String form(Model model) {
        model.addAttribute("docente", new User());
        return "pages/formularioDocente";
    }

    @PostMapping("/guardarDocente")
    public String guardarDocente(@ModelAttribute("docente") User docente, BindingResult bindingResult) {
        System.out.println("=== GUARDANDO DOCENTE ===");
        System.out.println("ID recibido: " + docente.getId());
        System.out.println("Nombre: " + docente.getNombre());
        System.out.println("Email: " + docente.getEmail());

        // Si es edición (tiene ID), cargar el usuario existente primero
        if (docente.getId() != null) {
            System.out.println("MODO: EDITANDO (ID existe)");
            Optional<User> docenteExistente = userService.buscarPorId(docente.getId());
            if (docenteExistente.isPresent()) {
                System.out.println("Docente encontrado en BD: " + docenteExistente.get().getNombre());
                User existente = docenteExistente.get();

                // Mantener campos que no se editan en el formulario
                docente.setUsername(existente.getUsername());
                docente.setPassword(existente.getPassword()); // Mantener contraseña existente
                docente.setRol(existente.getRol()); // Mantener rol existente
            } else {
                System.out.println("ADVERTENCIA: ID existe pero no se encontró en BD");
            }
        } else {
            System.out.println("MODO: NUEVO (ID es null)");
            // Si es nuevo, asignar valores por defecto
            if (docente.getUsername() == null || docente.getUsername().isEmpty()) {
                docente.setUsername(docente.getEmail());
            }

            if (docente.getPassword() == null || docente.getPassword().isEmpty()) {
                docente.setPassword("12345");
            }

            if (docente.getRol() == null) {
                docente.setRol(Rol.ROLE_DOCENTE);
            }
        }

        userService.guardarUsuario(docente);
        System.out.println("Docente guardado. Nuevo ID podría ser: " + docente.getId());
        return "redirect:/listaDocentes";
    }

    @GetMapping("/editarDocente/{id}")
    public String editarDocente(@PathVariable Long id, Model model) {
        System.out.println("=== EDITANDO DOCENTE ===");
        System.out.println("ID solicitado: " + id);

        Optional<User> docente = userService.buscarPorId(id);

        if (docente.isPresent()) {
            System.out.println("Docente encontrado: " + docente.get().getNombre());
            System.out.println("ID del docente: " + docente.get().getId());
            model.addAttribute("docente", docente.get());
            return "pages/formularioDocente";
        } else {
            System.out.println("Docente NO encontrado con ID: " + id);
            return "redirect:/listaDocentes";
        }
    }

    @GetMapping("/eliminarDocente/{id}")
    public String eliminarDocente(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            userService.eliminarUsuario(id);
            redirectAttributes.addFlashAttribute("mensajeExito", "Docente eliminado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("mensajeError", "Error al eliminar docente: " + e.getMessage());
        }
        return "redirect:/listaDocentes";
    }
}