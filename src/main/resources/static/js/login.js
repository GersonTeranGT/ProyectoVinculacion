document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const loginForm = document.getElementById('loginForm');
    //Funcion para alternar la visibilidad de la contraseña
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.querySelector('i').className = 'fas fa-eye-slash';
            } else {
                passwordInput.type = 'password';
                this.querySelector('i').className = 'fas fa-eye';
            }
        });
    }

    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            validateUsername();
        });

        usernameInput.addEventListener('blur', function() {
            validateUsername();
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword();
        });

        passwordInput.addEventListener('blur', function() {
            validatePassword();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            if (!validateUsername() || !validatePassword()) {
                event.preventDefault();
            }
        });
    }

    function validateUsername() {
        const usernameError = document.getElementById('usernameError');
        const value = usernameInput.value.trim();

        if (value === '') {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('error');
            usernameError.textContent = 'El nombre de usuario es obligatorio';
            return false;
        }

        const regex = /^[a-zA-Z._-]+$/;
        if (!regex.test(value)) {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('error');
            usernameError.textContent = 'No puedes usar números ni caracteres especiales excepto . _ -';
            return false;
        }

        if (value.length < 3 || value.length > 20) {
            usernameInput.classList.remove('valid');
            usernameInput.classList.add('error');
            usernameError.textContent = 'El usuario debe tener entre 3 y 20 caracteres';
            return false;
        }

        usernameInput.classList.remove('error');
        usernameInput.classList.add('valid');
        usernameError.textContent = '';
        return true;
    }

    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        const value = passwordInput.value;

        if (value === '') {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('error');
            passwordError.textContent = 'La contraseña es obligatoria';
            return false;
        }

        if (value.length < 6) {
            passwordInput.classList.remove('valid');
            passwordInput.classList.add('error');
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
            return false;
        }

        passwordInput.classList.remove('error');
        passwordInput.classList.add('valid');
        passwordError.textContent = '';
        return true;
    }
});