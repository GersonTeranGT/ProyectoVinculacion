package com.itsqmet.repository;

import com.itsqmet.entity.Docente;
import com.itsqmet.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface HorarioRepository extends JpaRepository<Horario, Long> {

    // Se mantiene
    List<Horario> findByCursoAndParaleloAndJornada(String curso, String paralelo, String jornada);

    // Se mantiene
    List<Horario> findByCurso(String curso);

    // Se mantiene (Asegúrate que diaSemana sea String en la Entidad)
    List<Horario> findByDocenteAndDiaSemana(Docente docente, String diaSemana);

    // CORREGIDO: Recibe el objeto Docente para que Spring haga el Join correctamente
    List<Horario> findByDocente(Docente docente);

    // Se mantiene (Usa LocalTime para coincidir con la entidad)
    List<Horario> findByCursoAndParaleloAndDiaSemanaAndHoraInicio(
            String curso, String paralelo, String diaSemana, LocalTime horaInicio);

    // CORREGIDO: La hora en la entidad es LocalTime, por lo tanto el parámetro debe ser LocalTime
    boolean existsByDocenteIdAndDiaSemanaAndHoraInicio(Long docenteId, String diaSemana, LocalTime horaInicio);

    // Extra para el Controller si decides usarlo
    Optional<Horario> findByDocenteIdAndDiaSemanaAndHoraInicio(Long docenteId, String diaSemana, LocalTime horaInicio);
}