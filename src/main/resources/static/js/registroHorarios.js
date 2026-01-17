function toggleDropdown() {
    const dropdown = document.getElementById('docenteDropdown');
    dropdown.classList.toggle('active');
}

function selectTeacher(name, subject) {
    // Actualiza el texto del input
    const selectedText = document.querySelector('.dropdown-selected span');
    selectedText.textContent = name + " (" + subject + ")";

    // Cambia el estilo para que parezca seleccionado
    selectedText.style.color = "#333";
    selectedText.style.fontWeight = "600";

    // Cierra el menú
    document.getElementById('docenteDropdown').classList.remove('active');
}

// Cierra el menú si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.closest('.custom-dropdown')) {
        const dropdown = document.getElementById('docenteDropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    }
}