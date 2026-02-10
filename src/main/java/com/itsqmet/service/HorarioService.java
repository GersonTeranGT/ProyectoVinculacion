package com.itsqmet.service;

import com.itsqmet.entity.Horario;
import com.itsqmet.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    public Horario guardarHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    public List<Horario> listarHorarios() {
        return horarioRepository.findAll();
    }

    public List<Horario> buscarPorDocente(String docente) {
        return horarioRepository.findByDocente(docente);
    }

    public List<Horario> buscarPorCurso(String curso) {
        return horarioRepository.findByCurso(curso);
    }
}