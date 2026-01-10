package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TeacherController {

    @GetMapping("/listaDocente")
    public String mostrarListaDocente(){
        return "pages/listaDocente";
    }

}
