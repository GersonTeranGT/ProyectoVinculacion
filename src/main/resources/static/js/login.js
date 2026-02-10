document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const user = document.getElementById("username");
    const pass = document.getElementById("password");
    const btn = document.querySelector(".btn-login");
    const toggle = document.getElementById("togglePassword");

    function mostrarError(input, mensaje) {
        limpiarError(input);
        const error = document.createElement("small");
        error.className = "error-msg";
        error.innerText = mensaje;
        input.classList.add("input-error");
        input.after(error);
    }

    function limpiarError(input) {
        input.classList.remove("input-error");
        const error = input.parentNode.querySelector(".error-msg");
        if (error) error.remove();
    }

    // Tiempo real
    user.addEventListener("input", () => {
        user.value.trim() === ""
            ? mostrarError(user, "El usuario es obligatorio")
            : limpiarError(user);
    });

    pass.addEventListener("input", () => {
        pass.value.trim() === ""
            ? mostrarError(pass, "La contraseña es obligatoria")
            : limpiarError(pass);
    });

    // Mostrar / ocultar contraseña
    toggle.addEventListener("click", () => {
        const icon = toggle.querySelector("i");
        if (pass.type === "password") {
            pass.type = "text";
            icon.className = "fas fa-eye-slash";
        } else {
            pass.type = "password";
            icon.className = "fas fa-eye";
        }
    });

    // Submit
    form.addEventListener("submit", (e) => {
        let valido = true;

        if (user.value.trim() === "") {
            mostrarError(user, "El usuario es obligatorio");
            valido = false;
        }

        if (pass.value.trim() === "") {
            mostrarError(pass, "La contraseña es obligatoria");
            valido = false;
        }

        if (!valido) {
            e.preventDefault();
            return;
        }

        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Verificando...`;
    });
});
