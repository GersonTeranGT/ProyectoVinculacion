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

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/horario")
public class HorarioController {

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private DocenteRepository docenteRepository;

    @GetMapping("")
    public String inicio() {
        return "redirect:/horario/bachillerato";
    }

    @GetMapping("/basica")
    public String mostrarHorarioBasica(Model model) {
        model.addAttribute("docentes", docenteRepository.findAll());
        model.addAttribute("nuevoHorario", new Horario());
        return "pages/crearHorarioBasica";
    }

    @GetMapping("/bachillerato")
    public String registrarHorarioBachillerato(Model model) {
        model.addAttribute("docentes", docenteRepository.findAll());
        model.addAttribute("nuevoHorario", new Horario());
        return "pages/crearHorarioBachillerato";
    }


    @GetMapping("/listaPorCurso")
    public String listaPorCurso() {

        return "pages/listaHorariosCurso";
    }

    @GetMapping("/listaPorDocente")
    public String listaPorDocente(Model model) {
        model.addAttribute("docentes", docenteRepository.findAll());

        return "pages/listaHorariosDocente";
    }

    @PostMapping("/guardarLote")
    @ResponseBody
    public ResponseEntity<String> guardarLote(@RequestBody List<Horario> horarios) {
        try {
            for (Horario h : horarios) {

                List<Horario> existen = horarioRepository.findByCursoAndParaleloAndDiaSemanaAndHoraInicio(
                        h.getCurso(), h.getParalelo(), h.getDiaSemana(), h.getHoraInicio());
                if (!existen.isEmpty()) {
                    return ResponseEntity.status(400).body("Cruce en: " + h.getDiaSemana() + " " + h.getHoraInicio());
                }
            }
            horarioRepository.saveAll(horarios);
            return ResponseEntity.ok("Éxito");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/buscar")
    @ResponseBody
    public List<Horario> buscarHorarios(@RequestParam String curso, @RequestParam String paralelo, @RequestParam String jornada) {
        return horarioRepository.findByCursoAndParaleloAndJornada(curso, paralelo, jornada);
    }

    @GetMapping("/buscarPorDocente")
    @ResponseBody
    public List<Horario> buscarPorDocente(@RequestParam Long docenteId) {
        Optional<Docente> docente = docenteRepository.findById(docenteId);
        if (docente.isPresent()) {
            // El repository corregido ahora recibe el OBJETO Docente
            return horarioRepository.findByDocente(docente.get());
        }
        return List.of();
    }

    @GetMapping("/verificar")
    @ResponseBody
    public Map<String, Object> verificarDisponibilidad(
            @RequestParam Long docenteId,
            @RequestParam String dia,
            @RequestParam String horaInicio) {

        Map<String, Object> response = new HashMap<>();
        try {
            // Normalizamos la hora para que LocalTime.parse no falle
            String horaNormalizada = horaInicio.length() == 5 ? horaInicio + ":00" : horaInicio;
            LocalTime horaBusqueda = LocalTime.parse(horaNormalizada);

            Optional<Docente> doc = docenteRepository.findById(docenteId);
            if (doc.isPresent()) {
                // Buscamos conflictos usando el objeto docente y el día
                List<Horario> conflictos = horarioRepository.findByDocenteAndDiaSemana(doc.get(), dia);
                Optional<Horario> cruce = conflictos.stream()
                        .filter(h -> h.getHoraInicio().equals(horaBusqueda))
                        .findFirst();

                if (cruce.isPresent()) {
                    response.put("ocupado", true);
                    response.put("curso", cruce.get().getCurso());
                    response.put("paralelo", cruce.get().getParalelo());
                    return response;
                }
            }
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }
        response.put("ocupado", false);
        return response;
    }

    // Mantengo este por si tu JS antiguo todavía usa /validarCruce
    @GetMapping("/validarCruce")
    @ResponseBody
    public Horario validarCruce(
            @RequestParam Long docenteId,
            @RequestParam String diaSemana,
            @RequestParam String horaInicio,
            @RequestParam String curso,
            @RequestParam String paralelo) {

        try {
            String horaNormalizada = horaInicio.length() == 5 ? horaInicio + ":00" : horaInicio;
            LocalTime horaBusqueda = LocalTime.parse(horaNormalizada);

            // 1. Validar choque en el mismo curso/paralelo
            List<Horario> conflictoCurso = horarioRepository.findByCursoAndParaleloAndDiaSemanaAndHoraInicio(
                    curso, paralelo, diaSemana, horaBusqueda);
            if (!conflictoCurso.isEmpty()) return conflictoCurso.get(0);

            // 2. Validar choque del docente
            Optional<Docente> docenteOpt = docenteRepository.findById(docenteId);
            if (docenteOpt.isPresent()) {
                List<Horario> conflictosDocente = horarioRepository.findByDocenteAndDiaSemana(docenteOpt.get(), diaSemana);
                return conflictosDocente.stream()
                        .filter(h -> h.getHoraInicio().equals(horaBusqueda))
                        .findFirst().orElse(null);
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
        return null;
    }

    // Metodo para eliminar horario por curso
    @DeleteMapping("/eliminar/{id}")
    @ResponseBody
    public ResponseEntity<?> eliminarHorario(@PathVariable Long id) {
        try {
            if (!horarioRepository.existsById(id)) {
                return ResponseEntity.status(404).body("Horario no encontrado");
            }
            horarioRepository.deleteById(id);
            return ResponseEntity.ok().body(Map.of("mensaje", "Horario eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar/{id}")
    @ResponseBody
    public ResponseEntity<?> actualizarHorario(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        try {
            Optional<Horario> horarioOpt = horarioRepository.findById(id);
            if (!horarioOpt.isPresent()) {
                return ResponseEntity.status(404).body("Horario no encontrado");
            }

            Horario horario = horarioOpt.get();

            // Actualizar solo materia y docente
            if (payload.containsKey("materia")) {
                horario.setMateria((String) payload.get("materia"));
            }

            if (payload.containsKey("docente")) {
                Map<String, Object> docenteMap = (Map<String, Object>) payload.get("docente");
                if (docenteMap != null && docenteMap.containsKey("id")) {
                    Long docenteId = ((Number) docenteMap.get("id")).longValue();
                    Optional<Docente> docente = docenteRepository.findById(docenteId);
                    if (docente.isPresent()) {
                        horario.setDocente(docente.get());
                    }
                }
            }

            horarioRepository.save(horario);
            return ResponseEntity.ok().body(Map.of("mensaje", "Horario actualizado correctamente"));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar: " + e.getMessage());
        }
    }

    @GetMapping("/buscarPorId/{id}")
    @ResponseBody
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<Horario> horario = horarioRepository.findById(id);
            if (horario.isPresent()) {
                return ResponseEntity.ok(horario.get());
            }
            return ResponseEntity.status(404).body("Horario no encontrado");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}