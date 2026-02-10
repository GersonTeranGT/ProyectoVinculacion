package com.itsqmet.service;

import com.itsqmet.entity.Docente;
import com.itsqmet.repository.DocenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocenteService {

    @Autowired
    private DocenteRepository docenteRepository;


    public void guardarDocente(Docente docente) {
        docenteRepository.save(docente);
    }

    public List<Docente> listarDocentes() {
        return docenteRepository.findAll();
    }

    public Docente buscarPorId(Long id) {
        Optional<Docente> optional = docenteRepository.findById(id);
        return optional.orElse(null);
    }

    public void eliminarDocente(Long id) {
        docenteRepository.deleteById(id);
    }
}