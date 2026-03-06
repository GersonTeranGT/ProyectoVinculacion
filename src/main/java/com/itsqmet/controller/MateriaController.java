package com.itsqmet.controller;

import com.itsqmet.entity.Materia;
import com.itsqmet.service.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/materias")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    // Listar materias y mostrar el formulario de agregar
    @GetMapping
    public String listarMaterias(Model model) {
        List<Materia> materias = materiaService.listarTodas();
        model.addAttribute("materias", materias);
        model.addAttribute("materia", new Materia()); // Para el formulario de creación
        return "pages/listaMaterias";
    }

    // Guardar o actualizar materia
    @PostMapping("/guardar")
    public String guardarMateria(@ModelAttribute("materia") Materia materia) {
        materiaService.guardar(materia);
        return "redirect:/materias";
    }

    // Editar materia (Carga los datos en el modelo y vuelve a la lista)
    @GetMapping("/editar/{id}")
    public String editarMateria(@PathVariable Long id, Model model) {
        Materia materia = materiaService.buscarPorId(id);
        List<Materia> materias = materiaService.listarTodas();
        model.addAttribute("materias", materias);
        model.addAttribute("materia", materia);
        return "pages/listaMaterias";
    }

    // Eliminar materia
    @GetMapping("/eliminar/{id}")
    public String eliminarMateria(@PathVariable Long id) {
        materiaService.eliminar(id);
        return "redirect:/materias";
    }
}