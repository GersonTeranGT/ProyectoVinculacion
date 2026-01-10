document.addEventListener('DOMContentLoaded', () => {
    const formUsuario = document.querySelector('form');

    formUsuario.addEventListener('submit', (evento) => {
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;

        // Sintaxis básica: Estructuras de control
        if (nombre.trim() === "" || password.length < 6) {
            alert("⚠️ Por favor, llena todos los campos correctamente (Contraseña mín. 6 caracteres)");
            evento.preventDefault();
            return;
        }

        // Confirmación final antes de procesar
        const confirmar = confirm("¿Desea guardar este nuevo usuario en la base de datos?");
        if (!confirmar) {
            evento.preventDefault();
        } else {
            console.log("Enviando datos de: " + nombre);
        }
    });
});