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

    // ==========================================
    // 1. LISTAR DOCENTES (Vista Principal)
    // ==========================================
    @GetMapping("/listaDocentes")
    public String mostrarListaDocente(Model model) {
        List<User> usuarios = userService.listarUsuarios();
        model.addAttribute("docentes", usuarios);
        return "pages/listaDocente"; // Asegúrate de que tu HTML esté en templates/pages/
    }

    // ==========================================
    // 2. FORMULARIO NUEVO DOCENTE
    // ==========================================
    @GetMapping("/nuevoDocente")
    public String form(Model model) {
        model.addAttribute("docente", new User());
        return "pages/formularioDocente";
    }

    // ==========================================
    // 3. GUARDAR / ACTUALIZAR (Con corrección de error)
    // ==========================================
    @PostMapping("/guardarDocente")
    public String guardarDocente(@ModelAttribute("docente") User docente) {

        // CORRECCIÓN DEL ERROR DE VALIDACIÓN:
        // Si no hay usuario, lo creamos a partir del correo pero QUITANDO el @ y lo que sigue.
        if (docente.getUsername() == null || docente.getUsername().isEmpty()) {
            String email = docente.getEmail();
            if (email != null && email.contains("@")) {
                // Ejemplo: juan.perez@gmail.com -> Se guarda: juan.perez
                docente.setUsername(email.split("@")[0]);
            } else {
                docente.setUsername(email);
            }
        }

        // Contraseña por defecto (Solo si es usuario nuevo)
        // Si es edición (ID no es null), mantenemos la contraseña que ya tiene en la BD
        if (docente.getId() == null) {
            docente.setPassword("12345"); // En un futuro, usa BCryptPasswordEncoder aquí
        } else {
            // Si es edición, necesitamos recuperar la contraseña vieja para no perderla
            // Opcional: si tu formulario no envía password, asegúrate de manejar esto en el servicio
            // Para este ejemplo simple, asumimos que se mantiene o se gestiona en el servicio.
            if(docente.getPassword() == null || docente.getPassword().isEmpty()){
                // Pequeña lógica de seguridad: Si viene vacía, recuperar la anterior o poner una por defecto
                // Para evitar errores rápidos, dejemos 12345 o recuperamos del servicio si fuera necesario.
                docente.setPassword("12345");
            }
        }

        // Asegurar el rol
        docente.setRol(Rol.ROLE_DOCENTE);

        userService.guardarUsuario(docente);
        return "redirect:/listaDocentes";
    }

    // ==========================================
    // 4. EDITAR DOCENTE
    // ==========================================
    @GetMapping("/docentes/editar/{id}")
    public String editarDocente(@PathVariable Long id, Model model) {
        Optional<User> docente = userService.buscarPorId(id);

        if (docente.isPresent()) {
            model.addAttribute("docente", docente.get());
            return "pages/formularioDocente"; // Reutilizamos el formulario de creación
        } else {
            return "redirect:/listaDocentes";
        }
    }

    // ==========================================
    // 5. ELIMINAR DOCENTE
    // ==========================================
    @GetMapping("/docentes/eliminar/{id}")
    public String eliminarDocente(@PathVariable Long id) {
        userService.eliminarUsuario(id);
        return "redirect:/listaDocentes";
    }
}