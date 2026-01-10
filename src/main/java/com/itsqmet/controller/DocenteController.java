package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DocenteController {

    @GetMapping("/form")
    public String form(){
        return "/pages/formularioDocente";
    }

}
