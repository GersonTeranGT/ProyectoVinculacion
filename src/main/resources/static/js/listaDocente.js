document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. BUSCADOR EN TIEMPO REAL
    // ==========================================
    const searchNombre = document.getElementById("searchNombre");
    const searchMateria = document.getElementById("searchMateria");
    const table = document.getElementById("docentesTable");

    // Obtenemos las filas del cuerpo de la tabla
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = tbody ? tbody.getElementsByTagName("tr") : [];

    function filtrarTabla() {
        const textoNombre = searchNombre.value.toLowerCase();
        const textoMateria = searchMateria.value.toLowerCase();

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];

            // Columna 0: Nombre | Columna 2: Materia (Indices basados en el HTML)
            let nombreTd = row.getElementsByTagName("td")[0];
            let materiaTd = row.getElementsByTagName("td")[2];

            if (nombreTd && materiaTd) {
                let valorNombre = nombreTd.textContent || nombreTd.innerText;
                let valorMateria = materiaTd.textContent || materiaTd.innerText;

                // Mostrar solo si coincide con AMBOS filtros (o si están vacíos)
                if (valorNombre.toLowerCase().indexOf(textoNombre) > -1 &&
                    valorMateria.toLowerCase().indexOf(textoMateria) > -1) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            }
        }
    }

    // Activamos el filtro cuando el usuario escribe
    if(searchNombre) searchNombre.addEventListener("keyup", filtrarTabla);
    if(searchMateria) searchMateria.addEventListener("keyup", filtrarTabla);


    // ==========================================
    // 2. CONFIRMACIÓN DE ELIMINAR
    // ==========================================
    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            // Pregunta de confirmación nativa del navegador
            const confirmado = confirm("¿Estás seguro de que deseas eliminar este docente? Esta acción no se puede deshacer.");

            if (!confirmado) {
                // Si dice "Cancelar", detenemos el enlace
                event.preventDefault();
            }
            // Si dice "Aceptar", el enlace (href) continúa normalmente al controlador
        });
    });
});