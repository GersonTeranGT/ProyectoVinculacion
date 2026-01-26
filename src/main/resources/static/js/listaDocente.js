document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BUSCADOR DOBLE (NOMBRE + ASIGNATURA) ---
    const searchNombreInput = document.getElementById('searchNombre');
    const searchMateriaInput = document.getElementById('searchMateria');
    const tableRows = document.querySelectorAll('#docentesTable tbody tr');

    function filterTable() {
        const nombreVal = searchNombreInput.value.toLowerCase();
        const materiaVal = searchMateriaInput.value.toLowerCase();

        tableRows.forEach(row => {
            // Buscamos las celdas por su clase identificadora
            const nombreText = row.querySelector('.name-col').textContent.toLowerCase();
            const materiaText = row.querySelector('.subject-col').textContent.toLowerCase();

            // Verificamos ambas condiciones
            const matchNombre = nombreText.includes(nombreVal);
            const matchMateria = materiaText.includes(materiaVal);

            // Mostrar solo si cumple ambas
            if (matchNombre && matchMateria) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Activar filtros al escribir
    if (searchNombreInput && searchMateriaInput) {
        searchNombreInput.addEventListener('keyup', filterTable);
        searchMateriaInput.addEventListener('keyup', filterTable);
    }

    // --- 2. CONFIRMACIÓN DE ELIMINACIÓN (Simulada para datos quemados) ---
    const deleteButtons = document.querySelectorAll('.btn-delete');

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const nombreDocente = row.querySelector('.name-col').textContent.trim();

            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente a: ${nombreDocente}?`);

            if (confirmacion) {
                // Simulamos la eliminación visual
                row.style.transition = "opacity 0.5s";
                row.style.opacity = "0";
                setTimeout(() => row.remove(), 500);
            }
        });
    });
    // NOTA: La lógica del Navbar (Mobile menu, perfil, notificaciones)
    // ya está siendo manejada por el archivo navbar.js que incluiste en el head.
});