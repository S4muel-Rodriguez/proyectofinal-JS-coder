document.addEventListener("DOMContentLoaded", () => {
    // Definición de precios de comida
    const preciosComida = {
        papas: 10,
        milanesa: 20,
        'carne roja': 30,
        pechuga: 25,
        ensalada: 15
    };

    // Guardar precios en localStorage
    localStorage.setItem('preciosComida', JSON.stringify(preciosComida));

    // Recuperar precios de localStorage
    const preciosGuardados = JSON.parse(localStorage.getItem('preciosComida'));

    // Creación del formulario
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

    // Creación del contenedor de resultados
    const resultadosDiv = document.createElement('div');
    resultadosDiv.id = 'resultados';
    document.body.appendChild(resultadosDiv);

    // Función para mostrar mensajes en el DOM
    const mostrarMensaje = (mensaje, tipo = 'info') => {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.classList.add('alert', `alert-${tipo}`);
        mensajeDiv.innerText = mensaje;
        resultadosDiv.appendChild(mensajeDiv);
    };

    // Limpiar mensajes previos
    const limpiarMensajes = () => {
        resultadosDiv.innerHTML = '';
    };

    // Procesar el formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        limpiarMensajes();

        const nombreCliente = document.getElementById('nombreCliente').value;
        const eleccionComida = document.getElementById('eleccionComida').value.toLowerCase();
        const precioSeleccionado = preciosGuardados[eleccionComida] || 0;
        const mensajeResultado = precioSeleccionado 
            ? `Hola ${nombreCliente}, el precio de ${eleccionComida} es $${precioSeleccionado}.`
            : `Lo sentimos, ${nombreCliente}, el plato ${eleccionComida} no está en el menú.`;

        const tipoMensaje = precioSeleccionado ? 'success' : 'danger';
        mostrarMensaje(mensajeResultado, tipoMensaje);

        // Buscar comidas similares
        const comidasDisponibles = Object.keys(preciosGuardados);
        const resultadosBusqueda = comidasDisponibles.filter(comida => comida.includes(eleccionComida));
        
        if (resultadosBusqueda.length > 0) {
            const busquedaMensaje = `Comidas similares disponibles: ${resultadosBusqueda.join(', ')}`;
            mostrarMensaje(busquedaMensaje, 'info');
        } else {
            mostrarMensaje('No se encontraron comidas similares.', 'warning');
        }
    });

    // Botón para cargar datos externos con JSON local o API externa
    const loadDataBtn = document.createElement('button');
    loadDataBtn.id = 'loadDataBtn';
    loadDataBtn.textContent = 'Cargar Datos';
    document.body.appendChild(loadDataBtn);

    loadDataBtn.addEventListener('click', () => {
        // Cargar datos desde un JSON local o una API externa
        const url = './pre-entregaN°3/data/comidas.json'; // O una URL de una API externa

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                const nuevosPrecios = {};
                data.comidas.forEach(comida => {
                    nuevosPrecios[comida.nombre] = comida.precio;
                });
                localStorage.setItem('preciosComida', JSON.stringify(nuevosPrecios));
                mostrarPrecios(nuevosPrecios);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
                alert('Hubo un problema al cargar los datos.');
            });
    });

    // Mostrar precios cargados
    const mostrarPrecios = (preciosComida) => {
        resultadosDiv.innerHTML = '';
        for (const [comida, precio] of Object.entries(preciosComida)) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('alert', 'alert-info');
            itemDiv.innerText = `${comida}: $${precio}`;
            resultadosDiv.appendChild(itemDiv);
        }
    };
});
