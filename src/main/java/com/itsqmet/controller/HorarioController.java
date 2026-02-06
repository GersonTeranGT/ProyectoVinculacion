package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping ("/horario")

public class HorarioController {
    @GetMapping
    public String registrarHorario(){
        return "pages/crearHorarioBachillerato";
    }
    @GetMapping("/listaHorarios")
    public String listaHorarios(){
        return "pages/listaHorarios";
    }
    @GetMapping ("/listaPorDocente")
    public String verHorarioDocente(){
        return "pages/listaHorariosDocente";

    }
    @GetMapping("/listaPorCurso")
    public String verHorarioCurso(){
        return "pages/listaHorariosCurso";
    }
    @GetMapping("/basica")
    public String mostrarHorarioBasica() {
        return "pages/crearHorarioBasica";
    }
}