document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const target = trigger.getAttribute('data-target');
            const content = document.getElementById(`content-${target}`);
            const icon = trigger.querySelector('.fa-chevron-down');
            const tbody = document.getElementById(`tbody-${target}`);

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';

                // Generar filas solo si la tabla está vacía
                if (tbody && tbody.innerHTML.trim() === "") {
                    const horas = ["07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00"];
                    tbody.innerHTML = horas.map(h => `
                        <tr class="hover:bg-gray-50">
                            <td class="p-3 border font-bold text-[#1a5f7a]">${h}</td>
                            <td class="p-3 border"></td><td class="p-3 border"></td>
                            <td class="p-3 border"></td><td class="p-3 border"></td>
                            <td class="p-3 border"></td>
                        </tr>
                    `).join('');
                }
            } else {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});