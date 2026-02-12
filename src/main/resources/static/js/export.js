function imprimirHorario(tipo) {
    const tituloImpresion = document.getElementById('tituloImpresion');
    const fechaActual = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let contenidoTitulo = '';

    if (tipo === 'docente') {
        const selectDocente = document.getElementById('selectDocente');
        const selectMateria = document.getElementById('selectMateria');

        const docente = selectDocente.options[selectDocente.selectedIndex].text;
        const materia = selectMateria.selectedIndex > 0 ? selectMateria.options[selectMateria.selectedIndex].text : 'General';

        contenidoTitulo = `
            <h1 class="text-2xl font-bold text-center mb-2">HORARIO DE CLASES - DOCENTE</h1>
            <div class="flex justify-between border-b-2 border-gray-800 pb-2 mb-4">
                <p><strong>Docente:</strong> ${docente}</p>
                <p><strong>Materia:</strong> ${materia}</p>
                <p><strong>Fecha:</strong> ${fechaActual}</p>
            </div>
        `;
    } else if (tipo === 'curso') {
        const selectCurso = document.getElementById('selectCurso');
        const selectParalelo = document.getElementById('selectParalelo');

        const curso = selectCurso.options[selectCurso.selectedIndex].text;
        const paralelo = selectParalelo.options[selectParalelo.selectedIndex].text;

        contenidoTitulo = `
            <h1 class="text-2xl font-bold text-center mb-2">HORARIO DE CLASES - ESTUDIANTES</h1>
            <div class="flex justify-between border-b-2 border-gray-800 pb-2 mb-4">
                <p><strong>Curso:</strong> ${curso}</p>
                <p><strong>Paralelo:</strong> ${paralelo}</p>
                <p><strong>Fecha:</strong> ${fechaActual}</p>
            </div>
        `;
    }

    tituloImpresion.innerHTML = contenidoTitulo;
    window.print();
}