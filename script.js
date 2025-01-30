document.addEventListener("DOMContentLoaded", function () {
    let fechaInput = document.getElementById("fecha");

    // Bloquear miércoles y domingos en el calendario
    fechaInput.addEventListener("input", function () {
        let fechaSeleccionada = new Date(this.value);
        let diaSemana = fechaSeleccionada.getDay(); // 0 = Domingo, 3 = Miércoles

        if (diaSemana === 0 || diaSemana === 3) {
            alert("Lo sentimos, la barbería no abre los miércoles ni los domingos.");
            this.value = ""; // Borra la fecha seleccionada
        }
    });

    // Fecha mínima (hoy)
    let hoy = new Date().toISOString().split("T")[0];
    fechaInput.setAttribute("min", hoy);
});

let turnosReservados = [];

document.getElementById("formularioCita").addEventListener("submit", function(event) {
    event.preventDefault();

    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let servicio = document.getElementById("servicio").value;
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;

    if (!fecha || !hora || !servicio || !nombre || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let citaSeleccionada = `${fecha} ${hora}`;

    // Verificar si el turno ya está ocupado
    if (turnosReservados.some(turno => turno.fechaHora === citaSeleccionada)) {
        document.getElementById("mensaje").innerHTML = `<span style="color: red;">Lo sentimos, ese horario ya está ocupado.</span>`;
    } else {
        // Guardar la cita en la lista de turnos reservados
        let nuevaCita = {
            fechaHora: citaSeleccionada,
            servicio: servicio.replace("_", " "),
            nombre: nombre,
            telefono: telefono
        };

        turnosReservados.push(nuevaCita);

        document.getElementById("mensaje").innerHTML = `<span style="color: green;">Tu cita ha sido reservada con éxito.</span>`;

        // Simulación de notificación
        setTimeout(() => {
            alert(`¡Hola ${nombre}! Tu cita para ${servicio.replace("_", " ")} el ${fecha} a las ${hora} ha sido confirmada. Nos vemos pronto!`);
        }, 1000);

        // Actualizar la lista de turnos agendados
        actualizarListaTurnos();
    }
});

function actualizarListaTurnos() {
    let lista = document.getElementById("listaTurnos");
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    turnosReservados.forEach(turno => {
        let item = document.createElement("li");
        item.innerHTML = `<strong>${turno.fechaHora}</strong> - ${turno.servicio} - ${turno.nombre} (${turno.telefono})`;
        lista.appendChild(item);
    });
}
