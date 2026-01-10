// Funcionalidades básicas para el Panel de Administración
document.addEventListener('DOMContentLoaded', () => {
    console.log('Panel de Administración - Unidad Educativa Fiscal');

    // 1. Efectos hover en botones
    const setupButtonEffects = () => {
        const buttons = document.querySelectorAll('a[class*="btn-"]');

        buttons.forEach(button => {
            // Efecto al pasar el mouse
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });

            // Efecto al hacer clic
            button.addEventListener('mousedown', () => {
                button.style.transform = 'scale(0.98)';
            });

            button.addEventListener('mouseup', () => {
                button.style.transform = 'translateY(-3px)';
            });
        });
    };

    // 2. Mostrar hora actual
    const showCurrentTime = () => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            // Crear elemento si no existe
            let timeElement = document.getElementById('current-time');
            if (!timeElement) {
                const header = document.querySelector('.text-center');
                if (header) {
                    timeElement = document.createElement('p');
                    timeElement.id = 'current-time';
                    timeElement.className = 'text-gray-500 text-sm mt-2';
                    header.appendChild(timeElement);
                }
            }

            if (timeElement) {
                timeElement.textContent = `Hora actual: ${timeString}`;
            }
        };

        updateTime();
        setInterval(updateTime, 60000); // Actualizar cada minuto
    };

    // 3. Animación de carga inicial
    const setupInitialAnimation = () => {
        const sections = document.querySelectorAll('.bg-white');

        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    // 4. Confirmación para acciones importantes
    const setupConfirmations = () => {
        const importantButtons = document.querySelectorAll('.btn-nuevo-docente, .btn-nuevo-horario, .btn-nuevo-estudiante');

        importantButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!confirm('¿Estás seguro de crear un nuevo registro?')) {
                    e.preventDefault();
                }
            });
        });
    };

    // 5. Inicializar todas las funciones
    const initPanel = () => {
        setupButtonEffects();
        showCurrentTime();
        setupInitialAnimation();
        setupConfirmations();

        console.log('Panel inicializado correctamente');
    };

    // Inicializar el panel
    initPanel();
});