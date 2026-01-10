// Funcionalidad para mostrar/ocultar contraseña
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Función para alternar visibilidad de contraseña
    const togglePasswordVisibility = () => {
        if (!togglePassword || !passwordInput) return;

        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Cambiar ícono
            const icon = togglePassword.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    };

    // Función para validar el formulario
    const setupFormValidation = () => {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            const username = document.getElementById('username')?.value.trim();
            const password = document.getElementById('password')?.value.trim();

            if (!username || !password) {
                e.preventDefault();
                showError('Por favor, completa todos los campos');
                return false;
            }

            if (username.length < 3) {
                e.preventDefault();
                showError('El usuario debe tener al menos 3 caracteres');
                return false;
            }

            if (password.length < 6) {
                e.preventDefault();
                showError('La contraseña debe tener al menos 6 caracteres');
                return false;
            }

            return true;
        });
    };

    // Función para mostrar errores
    const showError = (message) => {
        // Crear elemento de error si no existe
        let errorDiv = document.querySelector('.alert.alert-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'alert alert-error';
            const formHeader = document.querySelector('.form-header');
            if (formHeader) {
                formHeader.parentNode.insertBefore(errorDiv, formHeader.nextSibling);
            }
        }

        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorDiv.style.display = 'flex';

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    };

    // Función para manejar el efecto de carga del botón
    const setupButtonLoading = () => {
        const loginBtn = document.querySelector('.btn-login');
        const loginForm = document.getElementById('loginForm');

        if (!loginBtn || !loginForm) return;

        loginBtn.addEventListener('click', () => {
            // Solo agregar efecto si el formulario es válido
            if (loginForm.checkValidity()) {
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                loginBtn.disabled = true;

                // Restaurar botón después de 3 segundos si hay error
                setTimeout(() => {
                    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
                    loginBtn.disabled = false;
                }, 3000);
            }
        });
    };

    // Función para manejar "recordar sesión"
    const setupRememberMe = () => {
        const rememberCheckbox = document.querySelector('input[name="remember-me"]');

        if (!rememberCheckbox) return;

        // Cargar estado guardado
        if (localStorage.getItem('rememberMe') === 'true') {
            rememberCheckbox.checked = true;
        }

        // Guardar estado al cambiar
        rememberCheckbox.addEventListener('change', (e) => {
            localStorage.setItem('rememberMe', e.target.checked);
        });
    };

    // Función para validación en tiempo real
    const setupRealTimeValidation = () => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const validateUsername = () => {
            const username = usernameInput?.value.trim();
            if (username && username.length < 3) {
                usernameInput.style.borderColor = '#c62828';
            } else if (usernameInput) {
                usernameInput.style.borderColor = '#e0e0e0';
            }
        };

        const validatePassword = () => {
            const password = passwordInput?.value.trim();
            if (password && password.length < 6) {
                passwordInput.style.borderColor = '#c62828';
            } else if (passwordInput) {
                passwordInput.style.borderColor = '#e0e0e0';
            }
        };

        // Agregar event listeners para validación en tiempo real
        usernameInput?.addEventListener('input', validateUsername);
        usernameInput?.addEventListener('blur', validateUsername);

        passwordInput?.addEventListener('input', validatePassword);
        passwordInput?.addEventListener('blur', validatePassword);
    };

    // Función para limpiar errores al empezar a escribir
    const setupErrorCleanup = () => {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const errorDiv = document.querySelector('.alert.alert-error');
                if (errorDiv && errorDiv.style.display !== 'none') {
                    errorDiv.style.display = 'none';
                }

                // Restaurar borde normal
                input.style.borderColor = '#e0e0e0';
            });
        });
    };

    // Función para animación de focus en inputs
    const setupInputAnimations = () => {
        const inputs = document.querySelectorAll('.form-input');

        inputs.forEach(input => {
            // Efecto al focus
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });

            // Efecto al blur
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateY(0)';
            });
        });
    };

    // Función principal que inicializa todas las funcionalidades
    const initLoginPage = () => {
        console.log('Inicializando página de login...');

        togglePasswordVisibility();
        setupFormValidation();
        setupButtonLoading();
        setupRememberMe();
        setupRealTimeValidation();
        setupErrorCleanup();
        setupInputAnimations();

        // Efecto de entrada para el formulario
        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.style.opacity = '0';
            formContainer.style.transform = 'translateY(20px)';

            setTimeout(() => {
                formContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                formContainer.style.opacity = '1';
                formContainer.style.transform = 'translateY(0)';
            }, 100);
        }
    };

    // Inicializar la página
    initLoginPage();

    // Manejar la tecla Enter para submit
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.classList.contains('form-input')) {
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.requestSubmit();
            }
        }
    });

    // Función para pre-cargar recursos (si es necesario)
    const preloadResources = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.3s ease';
                });
            }
        });
    };

    preloadResources();