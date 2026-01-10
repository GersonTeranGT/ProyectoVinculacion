// Funcionalidades para la tabla de usuarios
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tabla de usuarios inicializada');

    // Función para confirmar eliminación
    window.confirmDelete = function() {
        return confirm('¿Estás seguro de eliminar este usuario?');
    };

    // Función para efectos hover en filas
    const setupRowEffects = () => {
        const rows = document.querySelectorAll('.table-row');

        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = '#f0f9ff';
            });

            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
    };

    // Función para efectos en botones
    const setupButtonEffects = () => {
        const buttons = document.querySelectorAll('.btn-editar, .btn-eliminar, .btn-nuevo, .btn-volver');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    };

    // Inicializar
    const initTablaUsuarios = () => {
        setupRowEffects();
        setupButtonEffects();
    };

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTablaUsuarios);
    } else {
        initTablaUsuarios();
    }
});