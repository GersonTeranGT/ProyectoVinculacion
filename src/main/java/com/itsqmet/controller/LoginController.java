package com.itsqmet.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/home")
    public String index() {
        return "index";
    }

    // REDIRIGIR POR ROLES
    @GetMapping("/login/postLogin")
    public String dirigirPorRol(Authentication authentication) {
        // OBTENER EL OBJETO USUARIO DEL INDEX
        User usuario = (User) authentication.getPrincipal();

        // PROCESA EL ROL DEL USUARIO
        String role = usuario.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .findFirst()
                .orElse("");

        if (role.equals("ROLE_ADMIN")) {
            return "redirect:/admin";
        } else if (role.equals("ROLE_DOCENTE")) {
            return "redirect:/registroHorario/listaHorarios";
        }

        // ERROR POR DEFAULT
        return "redirect:/home?error";
    }
}