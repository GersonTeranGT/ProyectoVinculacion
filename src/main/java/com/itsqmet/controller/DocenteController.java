package com.itsqmet.controller;

import com.itsqmet.entity.Docente;
import com.itsqmet.service.DocenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class DocenteController {

    @Autowired
    private DocenteService docenteService;

    @GetMapping("/nuevoDocente")
    public String form(Model model) {
        model.addAttribute("docente", new Docente());
        return "pages/formularioDocente";
    }

    @PostMapping("/guardarDocente")
    public String guardarDocente(@ModelAttribute("docente") Docente docente) {
        docenteService.guardarDocente(docente);
        return "redirect:/listaDocentes";
    }

    @GetMapping("/listaDocentes")
    public String mostrarListaDocente(Model model) {
        List<Docente> docentes = docenteService.listarDocentes();
        model.addAttribute("docentes", docentes);
        return "pages/listaDocente";
    }

    @GetMapping("/editarDocente/{id}")
    public String editarDocente(@PathVariable Long id, Model model) {
        Docente docente = docenteService.buscarPorId(id);
        model.addAttribute("docente", docente);
        return "pages/formularioDocente";
    }

    @GetMapping("/eliminarDocente/{id}")
    public String eliminarDocente(@PathVariable Long id) {
        docenteService.eliminarDocente(id);

        //BRYAN
        return "redirect:/listaDocentes";
    }
}