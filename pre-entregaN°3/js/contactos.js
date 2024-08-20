document.addEventListener('DOMContentLoaded', () => {
    // Cargar la librería Lodash (asegúrate de incluir el script en tu HTML)
    console.log('Lodash version:', _.VERSION); // Verifica que Lodash esté cargado

    // Función para capturar entradas mediante prompt()
    const captureInput = (message) => {
        let input = prompt(message);
        return input ? input.trim() : '';
    };

    // Declaración de variables y objetos necesarios para simular el proceso
    let order = {
        food: '',
        drink: '',
        quantity: 0,
        comment: ''
    };

    // Funciones para realizar operaciones
    const calculateTotal = (quantity, pricePerUnit) => quantity * pricePerUnit;
    const isPositive = (number) => number > 0;

    // Captura de entradas del usuario
    order.food = captureInput('¿Qué comida te gustaría pedir?');
    order.drink = captureInput('¿Qué bebida te gustaría pedir?');
    order.quantity = parseInt(captureInput('¿Cuántas unidades deseas pedir?'), 10);
    order.comment = captureInput('¿Algún comentario adicional para tu orden?');

    // Validar que todos los campos estén llenos
    let isValid = _.every(order, (value) => value !== '' && (typeof value !== 'number' || isPositive(value)));

    // Procesamiento esencial del simulador
    if (isValid) {
        const pricePerUnit = 5; // Suponiendo un precio fijo por unidad
        let totalPrice = calculateTotal(order.quantity, pricePerUnit);
        let hasComment = order.comment.length > 0;

        // Generación de elementos del DOM
        const resultsDiv = document.createElement('div');
        resultsDiv.innerHTML = `
            <p>Comida: ${order.food}</p>
            <p>Bebida: ${order.drink}</p>
            <p>Cantidad: ${order.quantity}</p>
            <p>Comentario: ${order.comment}</p>
            <p>Precio total: $${totalPrice}</p>
            <p>Tiene comentario: ${hasComment ? 'Sí' : 'No'}</p>
        `;
        document.body.appendChild(resultsDiv);

        // Notificación de resultados con alert()
        alert(`Detalles de la orden:\nComida: ${order.food}\nBebida: ${order.drink}\nCantidad: ${order.quantity}\nComentario: ${order.comment}\nPrecio total: $${totalPrice}\nTiene comentario: ${hasComment}`);
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }

    // Carga de datos desde un JSON local o API externa usando fetch
    const fetchMenuData = () => {
        fetch('pre-entregaN°3/js/comidas.json') // Ruta del archivo JSON local
            .then(response => response.json())
            .then(data => {
                console.log('Menú cargado:', data);
                // Mostrar datos en el DOM
                const menuDiv = document.createElement('div');
                menuDiv.innerHTML = `<h3>Menú disponible:</h3>`;
                data.menu.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = `${item.name}: $${item.price}`;
                    menuDiv.appendChild(itemDiv);
                });
                document.body.appendChild(menuDiv);
            })
            .catch(error => {
                console.error('Error al cargar el menú:', error);
                alert('Hubo un problema al cargar el menú.');
            });
    };

    // Evento para cargar el menú
    const loadMenuButton = document.createElement('button');
    loadMenuButton.textContent = 'Cargar Menú';
    loadMenuButton.addEventListener('click', fetchMenuData);
    document.body.appendChild(loadMenuButton);
});
