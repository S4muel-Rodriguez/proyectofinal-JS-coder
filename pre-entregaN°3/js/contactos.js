document.addEventListener('DOMContentLoaded', () => {
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
    let isValid = true;
    for (let key in order) {
        if (order[key] === '' || (key === 'quantity' && !isPositive(order[key]))) {
            isValid = false;
            break;
        }
    }

    // Procesamiento esencial del simulador
    if (isValid) {
        const pricePerUnit = 5; // Suponiendo un precio fijo por unidad
        let totalPrice = calculateTotal(order.quantity, pricePerUnit);
        let hasComment = order.comment.length > 0;

        // Resultados en consola
        console.log(`Comida: ${order.food}`);
        console.log(`Bebida: ${order.drink}`);
        console.log(`Cantidad: ${order.quantity}`);
        console.log(`Comentario: ${order.comment}`);
        console.log(`Precio total: $${totalPrice}`);
        console.log(`Tiene comentario: ${hasComment}`);

        // Notificación de resultados con alert()
        alert(`Comida: ${order.food}`);
        alert(`Bebida: ${order.drink}`);
        alert(`Cantidad: ${order.quantity}`);
        alert(`Comentario: ${order.comment}`);
        alert(`Precio total: $${totalPrice}`);
        alert(`Tiene comentario: ${hasComment}`);
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
});


// Optimización utilizando operadores lógicos y ternarios
const isPositive = (number) => number > 0;

// Validación de cantidad positiva usando operador lógico AND
order.quantity = isPositive(order.quantity) ? order.quantity : 0;

// Mostrar resultados usando operadores ternarios
console.log(`Cantidad: ${order.quantity}`);
console.log(`Tiene comentario: ${order.comment.length > 0 ? 'Sí' : 'No'}`);

// Desestructuración para obtener cantidad y comentario
const { quantity, comment } = order;

// Mostrar resultados en alertas con spread operator para copiar el objeto
alert(`Detalles de la orden:\nComida: ${order.food}\nBebida: ${order.drink}\nCantidad: ${quantity}\nComentario: ${comment}`);
