package com.itsqmet.service;

import com.itsqmet.entity.Horario;
import com.itsqmet.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    public Horario guardarHorario(Horario horario) {
        validarSuperposicion(horario);
        return horarioRepository.save(horario);
    }

    public List<Horario> listarHorarios() {
        return horarioRepository.findAll();
    }

    public Optional<Horario> obtenerPorId(Long id) {
        return horarioRepository.findById(id);
    }

    public Horario actualizarHorario(Long id, Horario horarioActualizado) {
        Horario horarioExistente = horarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));

        horarioActualizado.setId(id);
        validarSuperposicion(horarioActualizado);

        horarioExistente.setCurso(horarioActualizado.getCurso());
        horarioExistente.setParalelo(horarioActualizado.getParalelo());
        horarioExistente.setMateria(horarioActualizado.getMateria());
        horarioExistente.setDocente(horarioActualizado.getDocente());
        horarioExistente.setDiaSemana(horarioActualizado.getDiaSemana());
        horarioExistente.setHoraInicio(horarioActualizado.getHoraInicio());
        horarioExistente.setHoraFin(horarioActualizado.getHoraFin());
        horarioExistente.setJornada(horarioActualizado.getJornada());

        return horarioRepository.save(horarioExistente);
    }

    public void eliminarHorario(Long id) {
        horarioRepository.deleteById(id);
    }

    private void validarSuperposicion(Horario nuevoHorario) {
        List<Horario> horariosDocente = horarioRepository.findByDocenteAndDiaSemana(
                nuevoHorario.getDocente(), nuevoHorario.getDiaSemana());

        for (Horario h : horariosDocente) {
            if (h.getId().equals(nuevoHorario.getId())) {
                continue;
            }
            if (nuevoHorario.getHoraInicio().isBefore(h.getHoraFin()) &&
                    nuevoHorario.getHoraFin().isAfter(h.getHoraInicio())) {
                throw new RuntimeException("Conflicto de horario: El docente ya tiene una clase en este horario.");
            }
        }
    }

    public List<Horario> buscarPorCurso(String curso) {
        return horarioRepository.findByCurso(curso);
    }
}