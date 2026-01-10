document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONTROL DE NAVEGACIÓN ---

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navbarMenu.classList.toggle('show');
        });
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                this.classList.toggle('show');
            }
        });
    });

    // --- 2. BUSCADOR DINÁMICO PARA LA TABLA ---

    const tableHeader = document.querySelector('.flex.items-center.justify-between.mb-6');
    if (tableHeader) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'relative mt-4 mb-4';

        searchContainer.innerHTML = `
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fas fa-search text-gray-400"></i>
            </span>
            <input type="text" id="tableSearch" 
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 sm:text-sm" 
                placeholder="Buscar docente o materia..."
                style="border-color: var(--accent-color);">
        `;

        tableHeader.after(searchContainer);

        const searchInput = document.getElementById('tableSearch');
        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('.table-custom tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }

    // --- 3. CONFIRMACIÓN DE ELIMINACIÓN ---

    // Seleccionamos los formularios de eliminación que contienen el botón .btn-delete
    const deleteForms = document.querySelectorAll('form.inline');

    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Buscamos el nombre del docente en la misma fila
            const row = this.closest('tr');
            const nombreDocente = row.querySelector('td').textContent.trim();

            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar permanentemente a: ${nombreDocente}?`);

            if (!confirmacion) {
                e.preventDefault(); // Cancela la acción de envío
            }
        });
    });

    // --- 4. FEEDBACK VISUAL DE NOTIFICACIONES ---

    const notifCount = document.querySelector('.notification-count');
    if (notifCount && parseInt(notifCount.textContent) > 0) {
        notifCount.style.boxShadow = '0 0 10px var(--warning-color)';
    }
});