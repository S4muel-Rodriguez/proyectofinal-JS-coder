const nombreCliente = prompt("Ingrese su nombre:");
const eleccionComida = prompt("Ingrese el nombre del plato que desea:");

// Declarar variables y objetos necesarios
const preciosComida = {
    papas: 10,
    milanesa: 20,
    'carne roja': 30,
    pechuga: 25,
    ensalada: 15
};

// Funciones esenciales para el proceso de simulación
const obtenerPrecio = (comida) => {
    return preciosComida[comida.toLowerCase()] || 0;
};

const mostrarMensaje = (mensaje) => {
    alert(mensaje);
};

// Procesamiento esencial del simulador
const precioSeleccionado = obtenerPrecio(eleccionComida);
const mensajeResultado = precioSeleccionado 
    ? `Hola ${nombreCliente}, el precio de ${eleccionComida} es $${precioSeleccionado}.`
    : `Lo sentimos, ${nombreCliente}, el plato ${eleccionComida} no está en el menú.`;

// Notificación de resultados
mostrarMensaje(mensajeResultado);
console.log(mensajeResultado);

// Array y métodos de búsqueda y filtrado
const comidasDisponibles = Object.keys(preciosComida);

const buscarComida = (nombre) => {
    return comidasDisponibles.filter(comida => comida.includes(nombre.toLowerCase()));
};

const resultadosBusqueda = buscarComida(eleccionComida);
console.log("Resultados de la búsqueda:", resultadosBusqueda);




document.addEventListener("DOMContentLoaded", () => {
    // Declarar variables y objetos necesarios
    const preciosComida = {
        papas: 10,
        milanesa: 20,
        'carne roja': 30,
        pechuga: 25,
        ensalada: 15
    };

    // Funciones esenciales para el proceso de simulación
    const obtenerPrecio = (comida) => {
        return preciosComida[comida.toLowerCase()] || 0;
    };

    const mostrarMensaje = (mensaje, tipo = 'info') => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('alert', `alert-${tipo}`);
        mensajeDiv.innerText = mensaje;
        document.getElementById('resultados').appendChild(mensajeDiv);
    };

    const limpiarMensajes = () => {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';
    };

    // Capturar entradas mediante formulario
    const formulario = document.createElement('form');
    formulario.innerHTML = `
        <div class="mb-3">
            <label for="nombreCliente" class="form-label">Nombre del Cliente</label>
            <input type="text" class="form-control" id="nombreCliente" required>
        </div>
        <div class="mb-3">
            <label for="eleccionComida" class="form-label">Elija su Comida</label>
            <input type="text" class="form-control" id="eleccionComida" required>
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
    `;
    document.body.appendChild(formulario);

    // Div para mostrar resultados
    const resultadosDiv = document.createElement('div');
    resultadosDiv.id = 'resultados';
    document.body.appendChild(resultadosDiv);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        limpiarMensajes();
        
        const nombreCliente = document.getElementById('nombreCliente').value;
        const eleccionComida = document.getElementById('eleccionComida').value;

        // Procesamiento esencial del simulador
        const precioSeleccionado = obtenerPrecio(eleccionComida);
        const mensajeResultado = precioSeleccionado 
            ? `Hola ${nombreCliente}, el precio de ${eleccionComida} es $${precioSeleccionado}.`
            : `Lo sentimos, ${nombreCliente}, el plato ${eleccionComida} no está en el menú.`;

        // Notificación de resultados
        const tipoMensaje = precioSeleccionado ? 'success' : 'danger';
        mostrarMensaje(mensajeResultado, tipoMensaje);
        console.log(mensajeResultado);

        // Array y métodos de búsqueda y filtrado
        const comidasDisponibles = Object.keys(preciosComida);

        const buscarComida = (nombre) => {
            return comidasDisponibles.filter(comida => comida.includes(nombre.toLowerCase()));
        };

        const resultadosBusqueda = buscarComida(eleccionComida);
        console.log("Resultados de la búsqueda:", resultadosBusqueda);

        // Mostrar resultados de la búsqueda en el DOM
        if (resultadosBusqueda.length > 0) {
            const busquedaMensaje = `Comidas similares disponibles: ${resultadosBusqueda.join(', ')}`;
            mostrarMensaje(busquedaMensaje, 'info');
        } else {
            mostrarMensaje('No se encontraron comidas similares.', 'warning');
        }
    });
});


// Objeto con precios de comida
const preciocomida = {
    papas: 10,
    milanesa: 20,
    'carne roja': 30,
    pechuga: 25,
    ensalada: 15
};

// Guardar precios de comida en localStorage usando JSON
localStorage.setItem('preciosComida', JSON.stringify(preciosComida));

// Recuperar precios de comida desde localStorage y convertir de JSON a objeto
const preciosGuardados = JSON.parse(localStorage.getItem('preciosComida'));

// Mostrar precios recuperados en consola usando desestructuración y operador ternario
const { papas, milanesa, 'carne roja': carneRoja, pechuga, ensalada } = preciosGuardados;
console.log(`Precios recuperados:
    Papas: ${papas || 'No disponible'}
    Milanesa: ${milanesa || 'No disponible'}
    Carne Roja: ${carneRoja || 'No disponible'}
    Pechuga: ${pechuga || 'No disponible'}
    Ensalada: ${ensalada || 'No disponible'}
`);