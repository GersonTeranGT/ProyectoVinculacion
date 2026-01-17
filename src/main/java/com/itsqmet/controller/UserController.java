package com.itsqmet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping
    public String listaUsers(){
        return "pages/listaUsers";
    }

    @GetMapping("/formUser")
    public String panelAdmin(){
        return "pages/formUser";
    }
}
