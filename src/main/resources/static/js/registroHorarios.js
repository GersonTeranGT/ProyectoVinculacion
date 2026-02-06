/* =========================================
   VARIABLES GLOBALES
   ========================================= */
let currentCell = null;        // Celda que estamos editando
let selectedColor = '#3b82f6'; // Color seleccionado por defecto (Azul)

/* =========================================
   1. LÓGICA DE BARRAS DE SELECCIÓN (ARRIBA)
   ========================================= */

// Abrir/Cerrar los menús desplegables
function toggleCustomDropdown(id) {
    const options = document.querySelector(`#${id} .dropdown-options`);
    const arrow = document.querySelector(`#${id} .arrow-icon`);

    // Cerrar otros dropdowns
    document.querySelectorAll('.dropdown-options').forEach(opt => {
        if(opt !== options) opt.classList.remove('show');
    });
    document.querySelectorAll('.arrow-icon').forEach(a => {
        if(a !== arrow) a.style.transform = 'rotate(0deg)';
    });

    // Alternar estado
    options.classList.toggle('show');
    if(options.classList.contains('show')){
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Seleccionar opción (Curso o Paralelo)
function selectItem(type, value) {
    let textSpan, dropdownId;

    if (type === 'curso') {
        textSpan = document.getElementById('textCurso');
        dropdownId = 'dropdownCurso';
    } else {
        textSpan = document.getElementById('textParalelo');
        dropdownId = 'dropdownParalelo';
    }

    textSpan.textContent = value;
    textSpan.classList.add('active-text');

    document.querySelector(`#${dropdownId} .dropdown-options`).classList.remove('show');
    document.querySelector(`#${dropdownId} .arrow-icon`).style.transform = 'rotate(0deg)';
}

/* =========================================
   2. FUNCIONALIDAD DEL MODAL Y TABLAS
   ========================================= */

// ABRIR MODAL
function openModal(buttonElement) {
    const modal = document.getElementById('classModal');
    modal.style.display = 'flex';

    // Guardamos la celda (td) donde se hizo clic.
    currentCell = buttonElement.closest('td');

    // Opcional: Limpiar el formulario al abrir
    document.getElementById('modalMateria').value = '';
    document.getElementById('modalDocente').value = '';
    document.getElementById('modalAula').value = '';
    // Resetear color
    selectColor(document.querySelector('.color-option.c1'), '#3b82f6');
}

// CERRAR MODAL
function closeModal() {
    document.getElementById('classModal').style.display = 'none';
    currentCell = null;
}

// SELECCIONAR COLOR
function selectColor(element, colorHex) {
    document.querySelectorAll('.color-option').forEach(el => {
        el.classList.remove('selected');
        el.style.ringColor = 'transparent'; // Resetear anillo
    });
    element.classList.add('selected');
    element.style.ringColor = '#1f2937'; // Color del anillo de selección
    selectedColor = colorHex;
}

// GUARDAR (FUNCIONA PARA AMBAS JORNADAS)
function saveSchedule() {
    if (!currentCell) return;

    // 1. Obtener valores del nuevo formulario
    const materia = document.getElementById('modalMateria').value || 'Sin Materia';
    const docente = document.getElementById('modalDocente').value || 'Sin Docente';
    const aula = document.getElementById('modalAula').value || 'N/A';
    const horaInicio = document.getElementById('modalHoraInicio').value;
    const horaFin = document.getElementById('modalHoraFin').value;

    // Calcular duración (simple)
    let duracion = '60min'; // Valor por defecto
    if (horaInicio && horaFin) {
        const inicio = new Date(`2000-01-01T${horaInicio}`);
        const fin = new Date(`2000-01-01T${horaFin}`);
        const diffMs = fin - inicio;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        if (diffMins > 0) {
             duracion = `${diffMins}min`;
        }
    }

    // 2. Generar la tarjeta HTML con el nuevo diseño
    const cardHtml = `
        <div class="class-card" style="border-left-color: ${selectedColor};">
            <div class="card-header">
                <div>
                    <div class="card-subject">${materia}</div>
                    <div class="card-teacher">${docente}</div>
                </div>
                <button class="btn-delete-card" onclick="clearCell(this)" title="Eliminar clase">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="card-details">
                <span class="card-aula">${aula}</span>
                <div class="card-time-info">
                    <div class="card-hours">${horaInicio} - ${horaFin}</div>
                    <div class="card-duration">${duracion}</div>
                </div>
            </div>
        </div>
    `;

    // 3. Insertar en la celda actual
    currentCell.innerHTML = cardHtml;

    // Estilos para quitar borde punteado
    currentCell.style.border = 'none';
    currentCell.style.background = 'transparent';

    closeModal();
}

// ELIMINAR CLASE Y RESTAURAR EL "+"
function clearCell(btnDelete) {
    const cell = btnDelete.closest('td');

    cell.innerHTML = '<button class="add-btn" onclick="openModal(this)">+</button>';

    // Restaurar estilos originales
    cell.style.removeProperty('border');
    cell.style.removeProperty('background');
}

// CERRAR AL DAR CLIC FUERA
window.onclick = function(event) {
    const modal = document.getElementById('classModal');
    if (event.target == modal) closeModal();

    if (!event.target.closest('.custom-dropdown') && !event.target.closest('.modal-content')) {
        document.querySelectorAll('.dropdown-options').forEach(opt => opt.classList.remove('show'));
        document.querySelectorAll('.arrow-icon').forEach(a => a.style.transform = 'rotate(0deg)');
    }
}