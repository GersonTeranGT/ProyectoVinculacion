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

    @GetMapping
    public String registrarHorario() {
        return "pages/crearHorarioBachillerato";
    }

    @GetMapping("/listaHorarios")
    public String listaHorarios() {
        return "pages/listaHorarios";
    }

    @GetMapping("/listaPorDocente")
    public String verHorarioDocente(Model model) {
        List<Docente> docentes = docenteRepository.findAll();
        model.addAttribute("docentes", docentes);
        return "pages/listaHorariosDocente";
    }

    @GetMapping("/listaPorCurso")
    public String verHorarioCurso() {
        return "pages/listaHorariosCurso";
    }

    @PostMapping("/guardarLote")
    @ResponseBody
    public ResponseEntity<String> guardarLote(@RequestBody List<Horario> horarios) {
        try {
            horarioRepository.saveAll(horarios);
            return ResponseEntity.ok("Horario guardado con éxito");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/buscar")
    @ResponseBody
    public List<Horario> buscarHorarios(
            @RequestParam("curso") String curso,
            @RequestParam("paralelo") String paralelo,
            @RequestParam("jornada") String jornada) {
        return horarioRepository.findByCursoAndParaleloAndJornada(curso, paralelo, jornada);
    }

    @GetMapping("/buscarPorDocente")
    @ResponseBody
    public List<Horario> buscarPorDocente(@RequestParam("docenteId") Long docenteId) {
        return horarioRepository.findByDocenteId(docenteId);
    }
}