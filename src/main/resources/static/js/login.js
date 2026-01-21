document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
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
});