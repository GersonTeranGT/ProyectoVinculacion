/* =========================================
   VARIABLES GLOBALES
   ========================================= */
let currentCell = null;
let selectedColor = '#3b82f6';

/* =========================================
   1. LÓGICA DE BARRAS DE SELECCIÓN (ARRIBA)
   ========================================= */

function toggleCustomDropdown(id) {
    const options = document.querySelector(`#${id} .dropdown-options`);
    const arrow = document.querySelector(`#${id} .arrow-icon`);

    document.querySelectorAll('.dropdown-options').forEach(opt => {
        if(opt !== options) opt.classList.remove('show');
    });
    document.querySelectorAll('.arrow-icon').forEach(a => {
        if(a !== arrow) a.style.transform = 'rotate(0deg)';
    });

    options.classList.toggle('show');
    arrow.style.transform = options.classList.contains('show')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
}

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

    currentCell = buttonElement.closest('td');

    document.getElementById('modalMateria').value = '';
    document.getElementById('modalDocente').value = '';

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
    });

    element.classList.add('selected');
    selectedColor = colorHex;
}

// GUARDAR (VALIDANDO SOLO MATERIA Y DOCENTE)
function saveSchedule() {
    if (!currentCell) return;

    const materiaInput = document.getElementById('modalMateria');
    const docenteInput = document.getElementById('modalDocente');

    const materia = materiaInput.value.trim();
    const docente = docenteInput.value.trim();

    let error = false;

    // Validación Materia
    if (materia === '') {
        materiaInput.classList.add('input-error');
        error = true;
    } else {
        materiaInput.classList.remove('input-error');
    }

    // Validación Docente
    if (docente === '') {
        docenteInput.classList.add('input-error');
        error = true;
    } else {
        docenteInput.classList.remove('input-error');
    }

    if (error) return;

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
        </div>
    `;

    currentCell.innerHTML = cardHtml;
    currentCell.style.border = 'none';
    currentCell.style.background = 'transparent';

    closeModal();
}

// ELIMINAR CLASE
function clearCell(btnDelete) {
    const cell = btnDelete.closest('td');
    cell.innerHTML = '<button class="add-btn" onclick="openModal(this)">+</button>';
    cell.style.removeProperty('border');
    cell.style.removeProperty('background');
}

// CERRAR AL DAR CLIC FUERA
window.onclick = function(event) {
    const modal = document.getElementById('classModal');

    if (event.target == modal) closeModal();

    if (!event.target.closest('.custom-dropdown') &&
        !event.target.closest('.modal-content')) {
        document.querySelectorAll('.dropdown-options')
            .forEach(opt => opt.classList.remove('show'));
        document.querySelectorAll('.arrow-icon')
            .forEach(a => a.style.transform = 'rotate(0deg)');
    }
}
