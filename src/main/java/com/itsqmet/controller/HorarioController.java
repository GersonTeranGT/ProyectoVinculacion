package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping ("/registroHorario")

public class HorarioController {
    @GetMapping
    public String registrarHorario(){
        return "pages/crearHorarioBachillerato";
    }
}
