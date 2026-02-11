package com.itsqmet.controller;

import com.itsqmet.entity.Docente;
import com.itsqmet.entity.Horario;
import com.itsqmet.repository.DocenteRepository;
import com.itsqmet.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/horario")
public class HorarioController {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private DocenteRepository docenteRepository;

    @GetMapping("/basica")
    public String mostrarHorarioBasica(Model model) {
        List<Docente> docentes = docenteRepository.findAll();
        model.addAttribute("docentes", docentes);
        model.addAttribute("nuevoHorario", new Horario());
        return "pages/crearHorarioBasica";
    }

    // --- NUEVO MÉTODO PARA GUARDAR POR LOTES (Corrige el error 404) ---
    @PostMapping("/guardarLote")
    @ResponseBody
    public ResponseEntity<String> guardarLote(@RequestBody List<Horario> horarios) {
        try {
            // Guardamos la lista de objetos que llega desde el fetch de JS
            horarioRepository.saveAll(horarios);
            return ResponseEntity.ok("Horario guardado con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al guardar los datos: " + e.getMessage());
        }
    }

    // Método para procesar el guardado del modal (si decides usar el flujo antiguo)
    @PostMapping("/guardar")
    public String guardarHorario(@ModelAttribute Horario horario) {
        horarioRepository.save(horario);
        return "redirect:/horario/basica";
    }

    @GetMapping
    public String registrarHorario(){
        return "pages/crearHorarioBachillerato";
    }

    @GetMapping("/listaHorarios")
    public String listaHorarios(){
        return "pages/listaHorarios";
    }

    @GetMapping("/listaPorDocente")
    public String verHorarioDocente(){
        return "pages/listaHorariosDocente";
    }

    @GetMapping("/listaPorCurso")
    public String verHorarioCurso(){
        return "pages/listaHorariosCurso";
    }
}