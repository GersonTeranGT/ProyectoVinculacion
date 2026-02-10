package com.itsqmet.controller;

import com.itsqmet.entity.Horario;
import com.itsqmet.service.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "*")
public class HorarioApiController {

    @Autowired
    private HorarioService horarioService;

    @PostMapping
    public ResponseEntity<Horario> guardarHorario(@RequestBody Horario horario) {
        Horario nuevoHorario = horarioService.guardarHorario(horario);
        return new ResponseEntity<>(nuevoHorario, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Horario> listarHorarios() {
        return horarioService.listarHorarios();
    }

    @GetMapping("/docente/{nombreDocente}")
    public List<Horario> buscarPorDocente(@PathVariable String nombreDocente) {
        return horarioService.buscarPorDocente(nombreDocente);
    }

    @GetMapping("/curso/{nombreCurso}")
    public List<Horario> buscarPorCurso(@PathVariable String nombreCurso) {
        return horarioService.buscarPorCurso(nombreCurso);
    }
}