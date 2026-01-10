// Funcionalidades para el Footer Administrativo
document.addEventListener('DOMContentLoaded', () => {
    // Función para el botón "Volver arriba"
    const setupBackToTop = () => {
        const backToTopBtn = document.getElementById('backToTop');

        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTopBtn?.classList.add('visible');
            } else {
                backToTopBtn?.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTop);

        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Inicializar
        toggleBackToTop();
    };

    // Función para el formulario de newsletter
    const setupNewsletter = () => {
        const newsletterForm = document.querySelector('.newsletter-form');

        newsletterForm?.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput?.value.trim();

            if (!email) {
                showToast('Por favor, ingresa tu correo electrónico', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showToast('Por favor, ingresa un correo electrónico válido', 'error');
                return;
            }

            // Simular envío
            const submitBtn = newsletterForm.querySelector('button');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast('¡Gracias por suscribirte al boletín!', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1500);
        });
    };

    // Función para validar email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Función para mostrar notificaciones toast
    const showToast = (message, type = 'info') => {
        // Eliminar toast existente
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Crear nuevo toast
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        document.body.appendChild(toast);

        // Estilos para el toast
        const toastStyle = document.createElement('style');
        toastStyle.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                z-index: 9999;
                min-width: 300px;
                max-width: 500px;
                animation: toastSlideIn 0.3s ease forwards;
                border-left: 4px solid;
            }

            .toast-success {
                border-left-color: #28a745;
                background: linear-gradient(135deg, #d4edda, #f8f9fa);
            }

            .toast-error {
                border-left-color: #dc3545;
                background: linear-gradient(135deg, #f8d7da, #f8f9fa);
            }

            .toast-info {
                border-left-color: #17a2b8;
                background: linear-gradient(135deg, #d1ecf1, #f8f9fa);
            }

            .toast-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #333;
                font-size: 0.95rem;
            }

            .toast-content i {
                font-size: 1.2rem;
            }

            .toast-success .toast-content i {
                color: #28a745;
            }

            .toast-error .toast-content i {
                color: #dc3545;
            }

            .toast-info .toast-content i {
                color: #17a2b8;
            }

            .toast-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                transition: color 0.3s ease;
            }

            .toast-close:hover {
                color: #333;
            }

            @keyframes toastSlideIn {
                to {
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;

        document.head.appendChild(toastStyle);

        // Animación de entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        // Botón para cerrar
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn?.addEventListener('click', () => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        });

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.transform = 'translateX(-50%) translateY(100px)';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    };

    // Función para actualizar la hora de última sesión
    const updateSessionTime = () => {
        const sessionElements = document.querySelectorAll('.user-session span:last-child');

        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            sessionElements.forEach(el => {
                if (el.textContent !== timeString) {
                    el.textContent = timeString;
                }
            });
        };

        updateTime();
        setInterval(updateTime, 60000); // Actualizar cada minuto
    };

    // Función para efecto de hover en enlaces
    const setupLinkEffects = () => {
        const links = document.querySelectorAll('.footer-links a, .quick-link, .footer-legal a');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(3px)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });

            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0)';
                }
            });
        });
    };

    // Función para simular estado del sistema
    const simulateSystemStatus = () => {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-indicator strong');

        if (!statusDot || !statusText) return;

        const statuses = [
            { status: 'Operativo', color: '#57cc99', pulse: true },
            { status: 'Mantenimiento', color: '#ff9f1c', pulse: false },
            { status: 'Crítico', color: '#dc3545', pulse: false }
        ];

        // Cambiar estado aleatoriamente (simulación)
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% de probabilidad de cambio
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

                statusDot.style.backgroundColor = randomStatus.color;
                statusText.textContent = randomStatus.status;

                if (randomStatus.pulse) {
                    statusDot.style.animation = 'pulse 2s infinite';
                } else {
                    statusDot.style.animation = 'none';
                }

                // Mostrar notificación de cambio
                if (randomStatus.status !== 'Operativo') {
                    showToast(`Estado del sistema cambiado a: ${randomStatus.status}`, 'info');
                }
            }
        }, 10000); // Verificar cada 10 segundos
    };

    // Función para efectos de carga perezosa en imágenes
    const setupLazyLoading = () => {
        const images = document.querySelectorAll('.footer-logo-img');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';

                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 100);

                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    };

    // Función para manejar accesibilidad
    const setupAccessibility = () => {
        // Manejar navegación con teclado
        document.addEventListener('keydown', (e) => {
            // Alt + F para enfocar el footer
            if (e.altKey && e.key === 'f') {
                const firstFooterLink = document.querySelector('.footer-links a, .quick-link');
                firstFooterLink?.focus();
            }

            // Escape para cerrar toasts
            if (e.key === 'Escape') {
                const toast = document.querySelector('.toast-notification');
                toast?.remove();
            }
        });

        // Añadir atributos ARIA
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            const label = icon.getAttribute('aria-label');
            if (!label) {
                const platform = icon.querySelector('i').className.match(/fa-(facebook|twitter|instagram|youtube|envelope)/)?.[1];
                if (platform) {
                    icon.setAttribute('aria-label', `Síguenos en ${platform}`);
                }
            }
        });
    };

    // Función principal de inicialización
    const initFooter = () => {
        console.log('Inicializando footer administrativo...');

        setupBackToTop();
        setupNewsletter();
        updateSessionTime();
        setupLinkEffects();
        simulateSystemStatus();
        setupLazyLoading();
        setupAccessibility();

        // Mostrar mensaje de bienvenida
        setTimeout(() => {
            showToast('Panel de Administración - Unidad Educativa Aida Gallegos', 'info');
        }, 1000);
    };

    // Inicializar footer
    initFooter();
});