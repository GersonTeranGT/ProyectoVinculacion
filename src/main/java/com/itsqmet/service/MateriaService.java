package com.itsqmet.service;

import com.itsqmet.entity.Materia;
import com.itsqmet.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MateriaService {
    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> listarTodas() { return materiaRepository.findAll(); }
    public void guardar(Materia materia) { materiaRepository.save(materia); }
    public void eliminar(Long id) { materiaRepository.deleteById(id); }
    public Materia buscarPorId(Long id) { return materiaRepository.findById(id).orElse(null); }
}