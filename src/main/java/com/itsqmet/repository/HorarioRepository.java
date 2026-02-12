package com.itsqmet.repository;

import com.itsqmet.entity.Docente;
import com.itsqmet.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HorarioRepository extends JpaRepository<Horario, Long> {

    // 1. Para la búsqueda completa por filtros (Curso, Paralelo y Jornada)
    List<Horario> findByCursoAndParaleloAndJornada(String curso, String paralelo, String jornada);

    // 2. Para buscar solo por curso (El que te está dando el error actual)
    List<Horario> findByCurso(String curso);

    // 3. Para la búsqueda por docente y día (El error que tenías antes)
    List<Horario> findByDocenteAndDiaSemana(Docente docente, String diaSemana);

    // 4. Por si necesitas buscar todos los horarios de un docente específico
    List<Horario> findByDocenteId(Long docenteId);
}