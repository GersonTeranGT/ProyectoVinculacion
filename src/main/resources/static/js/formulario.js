document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const nombreInput = document.getElementById('nombre');
    const cursoSelect = document.getElementById('cursoAsignado');
    const jornadaSelect = document.getElementById('jornada');
    const materiaSelect = document.getElementById('materia');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');

    if (nombreInput) {
        nombreInput.addEventListener('input', function() {
            validateNombre();
        });

        nombreInput.addEventListener('blur', function() {
            validateNombre();
        });
    }

    if (cursoSelect) {
        cursoSelect.addEventListener('change', function() {
            validateCurso();
        });
    }

    if (jornadaSelect) {
        jornadaSelect.addEventListener('change', function() {
            validateJornada();
        });
    }

    if (materiaSelect) {
        materiaSelect.addEventListener('change', function() {
            validateMateria();
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail();
        });

        emailInput.addEventListener('blur', function() {
            validateEmail();
        });
    }

    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            validateTelefono();
        });

        telefonoInput.addEventListener('blur', function() {
            validateTelefono();
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            const isValid =
                validateNombre() &&
                validateCurso() &&
                validateJornada() &&
                validateMateria() &&
                validateEmail() &&
                validateTelefono();

            if (!isValid) {
                event.preventDefault();
                showAllErrors();
            }
        });
    }

    function validateNombre() {
        const nombreError = document.getElementById('nombreError');
        const value = nombreInput.value.trim();

        if (value === '') {
            setError(nombreInput, nombreError, 'El nombre es obligatorio');
            return false;
        }

        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regex.test(value)) {
            setError(nombreInput, nombreError, 'Solo se permiten letras y espacios');
            return false;
        }

        if (value.split(' ').length < 2) {
            setError(nombreInput, nombreError, 'Ingrese nombre y apellido');
            return false;
        }

        setValid(nombreInput, nombreError);
        return true;
    }

    function validateCurso() {
        const cursoError = document.getElementById('cursoError');
        const value = cursoSelect.value;

        if (value === '' || value === null) {
            setError(cursoSelect, cursoError, 'Seleccione un curso');
            return false;
        }

        setValid(cursoSelect, cursoError);
        return true;
    }

    function validateJornada() {
        const jornadaError = document.getElementById('jornadaError');
        const value = jornadaSelect.value;

        if (value === '' || value === null) {
            setError(jornadaSelect, jornadaError, 'Seleccione una jornada');
            return false;
        }

        setValid(jornadaSelect, jornadaError);
        return true;
    }

    function validateMateria() {
        const materiaError = document.getElementById('materiaError');
        const value = materiaSelect.value;

        if (value === '' || value === null) {
            setError(materiaSelect, materiaError, 'Seleccione una materia');
            return false;
        }

        setValid(materiaSelect, materiaError);
        return true;
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const value = emailInput.value.trim();

        if (value === '') {
            setError(emailInput, emailError, 'El correo electrónico es obligatorio');
            return false;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(value)) {
            setError(emailInput, emailError, 'Ingrese un correo electrónico válido');
            return false;
        }

        setValid(emailInput, emailError);
        return true;
    }

    function validateTelefono() {
        const telefonoError = document.getElementById('telefonoError');
        const value = telefonoInput.value.trim();

        if (value === '') {
            setError(telefonoInput, telefonoError, 'El teléfono es obligatorio');
            return false;
        }

        const regex = /^0[0-9]{9}$/;
        if (!regex.test(value)) {
            setError(telefonoInput, telefonoError, 'El teléfono debe empezar con 0 y tener 10 dígitos');
            return false;
        }

        setValid(telefonoInput, telefonoError);
        return true;
    }

    function setError(input, errorElement, message) {
        input.classList.remove('valid');
        input.classList.add('error');
        errorElement.textContent = message;
    }

    function setValid(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.textContent = '';
    }

    function showAllErrors() {
        validateNombre();
        validateCurso();
        validateJornada();
        validateMateria();
        validateEmail();
        validateTelefono();
    }
});