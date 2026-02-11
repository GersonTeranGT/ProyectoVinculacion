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
    public ResponseEntity<?> guardarHorario(@RequestBody Horario horario) {
        try {
            Horario nuevoHorario = horarioService.guardarHorario(horario);
            return new ResponseEntity<>(nuevoHorario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public List<Horario> listarHorarios() {
        return horarioService.listarHorarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> obtenerHorario(@PathVariable Long id) {
        return horarioService.obtenerPorId(id)
                .map(horario -> new ResponseEntity<>(horario, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarHorario(@PathVariable Long id, @RequestBody Horario horario) {
        try {
            Horario horarioActualizado = horarioService.actualizarHorario(id, horario);
            return new ResponseEntity<>(horarioActualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHorario(@PathVariable Long id) {
        horarioService.eliminarHorario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/curso/{nombreCurso}")
    public List<Horario> buscarPorCurso(@PathVariable String nombreCurso) {
        return horarioService.buscarPorCurso(nombreCurso);
    }
}