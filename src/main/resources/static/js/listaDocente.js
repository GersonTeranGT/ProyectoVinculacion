document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BUSCADOR DOBLE (NOMBRE Y MATERIA) ---
    const searchNombreInput = document.getElementById('searchNombre');
    const searchMateriaInput = document.getElementById('searchMateria');
    const tableRows = document.querySelectorAll('#docentesTable tbody tr');

    function filterTable() {
        const nombreVal = searchNombreInput?.value.toLowerCase().trim() || '';
        const materiaVal = searchMateriaInput?.value.toLowerCase().trim() || '';

        tableRows.forEach(row => {
            const nombreText = row.querySelector('.name-col')?.textContent.toLowerCase() || '';
            const materiaText = row.querySelector('.subject-col')?.textContent.toLowerCase() || '';

            // Coincidencias individuales
            const matchNombre = nombreText.includes(nombreVal);
            const matchMateria = materiaText.includes(materiaVal);

            // Si ambos campos están vacíos, muestra todo
            if (nombreVal === '' && materiaVal === '') {
                row.style.display = '';
            }
            // Si solo nombre tiene valor, filtra solo por nombre
            else if (nombreVal !== '' && materiaVal === '') {
                row.style.display = matchNombre ? '' : 'none';
            }
            // Si solo materia tiene valor, filtra solo por materia
            else if (nombreVal === '' && materiaVal !== '') {
                row.style.display = matchMateria ? '' : 'none';
            }
            // Si ambos tienen valor, debe cumplir ambas condiciones (AND)
            else {
                row.style.display = (matchNombre && matchMateria) ? '' : 'none';
            }
        });
    }

    // --- 2. FUNCIONES PARA LIMPIAR BÚSQUEDAS ---
    window.limpiarBusqueda = function(tipo) {
        if (tipo === 'nombre') {
            if (searchNombreInput) {
                searchNombreInput.value = '';
                searchNombreInput.focus();
            }
        } else if (tipo === 'materia') {
            if (searchMateriaInput) {
                searchMateriaInput.value = '';
                searchMateriaInput.focus();
            }
        }
        filterTable();
    };

    // --- 3. EVENT LISTENERS ---
    if (searchNombreInput) {
        searchNombreInput.addEventListener('input', filterTable);
        searchNombreInput.addEventListener('keyup', filterTable);
    }

    if (searchMateriaInput) {
        searchMateriaInput.addEventListener('input', filterTable);
        searchMateriaInput.addEventListener('keyup', filterTable);
    }

    // --- 4. CONFIRMACIÓN DE ELIMINACIÓN ---
    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const nombreDocente = row.querySelector('.name-col')?.textContent.trim() || 'docente';

            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente a: ${nombreDocente}?`);

            if (confirmacion) {
                row.style.transition = "opacity 0.3s";
                row.style.opacity = "0";
                setTimeout(() => row.remove(), 300);

                // Aquí puedes agregar el fetch para eliminar realmente
                const deleteUrl = this.closest('a').getAttribute('href');
                // fetch(deleteUrl, { method: 'GET' });
            }
        });
    });
});