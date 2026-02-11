document.addEventListener("DOMContentLoaded", function () {

    // --- VARIABLES ---
    const searchNombre = document.getElementById("searchNombre");
    const searchMateria = document.getElementById("searchMateria");

    const btnLimpiarNombre = document.getElementById("btnLimpiarNombre");
    const btnLimpiarMateria = document.getElementById("btnLimpiarMateria");

    const table = document.getElementById("docentesTable");

    // --- FUNCIÓN FILTRAR ---
    function filtrarTabla() {
        if (!table) return;

        const tbody = table.getElementsByTagName("tbody")[0];
        const rows = tbody.getElementsByTagName("tr");

        const txtNombre = searchNombre ? searchNombre.value.toLowerCase() : "";
        const txtMateria = searchMateria ? searchMateria.value.toLowerCase() : "";

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            // Ignorar filas que no sean de datos
            if (row.cells.length < 2) continue;

            // Columna 0: Nombre | Columna 2: Materia
            let nombreTd = row.getElementsByTagName("td")[0];
            let materiaTd = row.getElementsByTagName("td")[2];

            if (nombreTd && materiaTd) {
                let valNombre = nombreTd.textContent || nombreTd.innerText;
                let valMateria = materiaTd.textContent || materiaTd.innerText;

                // Coincidir ambos criterios
                if (valNombre.toLowerCase().indexOf(txtNombre) > -1 &&
                    valMateria.toLowerCase().indexOf(txtMateria) > -1) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        }
    }

    // --- EVENTOS (Escribir) ---
    if(searchNombre) searchNombre.addEventListener("keyup", filtrarTabla);
    if(searchMateria) searchMateria.addEventListener("keyup", filtrarTabla);

    // --- EVENTOS (Limpiar "X") ---
    if(btnLimpiarNombre && searchNombre) {
        btnLimpiarNombre.addEventListener("click", function() {
            searchNombre.value = "";
            searchNombre.focus();
            filtrarTabla();
        });
    }

    if(btnLimpiarMateria && searchMateria) {
        btnLimpiarMateria.addEventListener("click", function() {
            searchMateria.value = "";
            searchMateria.focus();
            filtrarTabla();
        });
    }

    // --- CONFIRMACIÓN ELIMINAR ---
    const deleteButtons = document.querySelectorAll(".btn-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            if (!confirm("¿Estás seguro de que deseas eliminar este docente? Esta acción no se puede deshacer.")) {
                event.preventDefault();
            }
        });
    });
});