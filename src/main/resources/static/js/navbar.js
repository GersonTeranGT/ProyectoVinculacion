// Funcionalidades para la navbar de administrador
document.addEventListener('DOMContentLoaded', () => {
    // Función para alternar menús desplegables en móvil
    const setupMobileMenu = () => {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.navbar-menu');

        mobileBtn?.addEventListener('click', () => {
            navMenu?.classList.toggle('show');
            mobileBtn.querySelector('i').classList.toggle('fa-bars');
            mobileBtn.querySelector('i').classList.toggle('fa-times');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navMenu?.contains(e.target) && !mobileBtn?.contains(e.target)) {
                navMenu?.classList.remove('show');
                mobileBtn?.querySelector('i')?.classList.add('fa-bars');
                mobileBtn?.querySelector('i')?.classList.remove('fa-times');
            }
        });
    };

    // Función para manejar dropdowns
    const setupDropdowns = () => {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');

            toggle?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Cerrar otros dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('show');
                    }
                });

                // Alternar dropdown actual
                dropdown.classList.toggle('show');
            });

            // Cerrar dropdown al hacer clic fuera
            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            // Prevenir cierre al hacer clic dentro del menú
            menu?.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    };

    // Función para manejar perfil y notificaciones
    const setupProfileAndNotifications = () => {
        const profileDropdown = document.querySelector('.profile-dropdown');
        const notifications = document.querySelector('.notifications');

        // Alternar menú de perfil
        profileDropdown?.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            notifications?.classList.remove('show');
        });

        // Alternar notificaciones
        notifications?.addEventListener('click', (e) => {
            e.stopPropagation();
            notifications.classList.toggle('show');
            profileDropdown?.classList.remove('show');
        });

        // Cerrar menús al hacer clic fuera
        document.addEventListener('click', () => {
            profileDropdown?.classList.remove('show');
            notifications?.classList.remove('show');
        });
    };

    // Función para manejar logout con confirmación
    const setupLogoutConfirmation = () => {
        const logoutBtn = document.querySelector('.logout-btn');

        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();

            const confirmLogout = confirm('¿Estás seguro de que deseas cerrar sesión?');

            if (confirmLogout) {
                const logoutForm = logoutBtn.closest('form');
                logoutForm?.submit();
            }
        });
    };

    // Función para marcar notificaciones como leídas
    const setupNotifications = () => {
        const markAllRead = document.querySelector('.mark-all-read');
        const notificationItems = document.querySelectorAll('.notification-item');
        const notificationCount = document.querySelector('.notification-count');

        markAllRead?.addEventListener('click', (e) => {
            e.preventDefault();

            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });

            if (notificationCount) {
                notificationCount.textContent = '0';
                notificationCount.style.display = 'none';
            }

            // Aquí podrías agregar una llamada AJAX para marcar como leídas en el servidor
            console.log('Notificaciones marcadas como leídas');
        });

        // Marcar individualmente como leída
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('unread')) {
                    item.classList.remove('unread');
                    updateNotificationCount();
                }
            });
        });

        const updateNotificationCount = () => {
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;

            if (notificationCount) {
                if (unreadCount > 0) {
                    notificationCount.textContent = unreadCount;
                    notificationCount.style.display = 'flex';
                } else {
                    notificationCount.style.display = 'none';
                }
            }
        };
    };

    // Función para actualizar breadcrumb según la página actual
    const updateBreadcrumb = () => {
        const currentPage = document.getElementById('current-page');
        const activeLink = document.querySelector('.nav-link.active');

        if (currentPage && activeLink) {
            const pageName = activeLink.querySelector('span')?.textContent || 'Página Actual';
            currentPage.textContent = pageName;
        }
    };

    // Función para agregar efectos visuales
    const setupVisualEffects = () => {
        // Efecto de onda en clics
        const buttons = document.querySelectorAll('button, .nav-link, .dropdown-item');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    width: 100px;
                    height: 100px;
                    top: ${y - 50}px;
                    left: ${x - 50}px;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Añadir estilo CSS para la animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Función para manejar teclas de acceso rápido
    const setupKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Alt + L para logout
            if (e.altKey && e.key === 'l') {
                const logoutBtn = document.querySelector('.logout-btn');
                logoutBtn?.click();
            }

            // Alt + N para notificaciones
            if (e.altKey && e.key === 'n') {
                const notificationBtn = document.querySelector('.notification-btn');
                notificationBtn?.click();
            }

            // Escape para cerrar menús
            if (e.key === 'Escape') {
                document.querySelectorAll('.show').forEach(el => {
                    el.classList.remove('show');
                });
            }
        });
    };

    // Función principal de inicialización
    const initNavbar = () => {
        console.log('Inicializando navbar de administrador...');

        setupMobileMenu();
        setupDropdowns();
        setupProfileAndNotifications();
        setupLogoutConfirmation();
        setupNotifications();
        updateBreadcrumb();
        setupVisualEffects();
        setupKeyboardShortcuts();

        // Actualizar hora de último acceso
        const lastAccess = document.querySelector('.profile-details small');
        if (lastAccess) {
            const now = new Date();
            lastAccess.textContent = `Último acceso: ${now.toLocaleDateString('es-ES')} ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Agregar clase activa según URL actual
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // Inicializar navbar
    initNavbar();
});