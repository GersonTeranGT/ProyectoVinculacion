package com.itsqmet.repository;

import com.itsqmet.entity.Docente;
import com.itsqmet.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {
    List<Horario> findByDocente(Docente docente);
    List<Horario> findByCurso(String curso);
    List<Horario> findByDocenteAndDiaSemana(Docente docente, String diaSemana);
}