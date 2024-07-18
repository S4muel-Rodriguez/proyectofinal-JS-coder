document.addEventListener('DOMContentLoaded', () => {
    // Declaración de arrays y objetos
    const restaurants = [
        { name: 'Pin Pun', url: 'https://www.instagram.com/pinpunlomas/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.6760245829523!2d-58.408907023483444!3d-34.76375307289744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd3193abd8235%3A0xf355be1ab3f3056a!2sPin%20Pun!5e0!3m2!1ses-419!2sar!4v1712711353899!5m2!1ses-419!2sar' },
        { name: 'Las Medialunas del Abuelo', url: 'https://www.instagram.com/lasmedialunasdelabuelo/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.8284902288997!2d-58.405567016866655!3d-34.75991299655742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2920b587939%3A0x62696178577701d1!2sLas%20Medialunas%20del%20Abuelo!5e0!3m2!1ses-419!2sar!4v1712711501699!5m2!1ses-419!2sar' }
    ];

    // Función para mostrar restaurantes en el DOM
    const displayRestaurants = (restaurants) => {
        const main = document.querySelector('main');
        main.innerHTML = '<h2>Redes sociales de los restaurantes:</h2>';

        restaurants.forEach((restaurant) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = restaurant.url;
            link.textContent = `Instagram de ${restaurant.name}`;
            listItem.appendChild(link);
            main.appendChild(listItem);

            const mapIframe = document.createElement('iframe');
            mapIframe.src = restaurant.map;
            mapIframe.width = '600';
            mapIframe.height = '450';
            mapIframe.style.border = '0';
            mapIframe.allowFullscreen = true;
            mapIframe.loading = 'lazy';
            mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
            main.appendChild(mapIframe);
        });
    };

    // Mostrar los restaurantes al cargar la página
    displayRestaurants(restaurants);

    // Crear formulario para capturar datos del usuario
    const createForm = () => {
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="mb-3">
                <label for="restaurantName" class="form-label">Nombre del restaurante:</label>
                <input type="text" class="form-control" id="restaurantName" required>
            </div>
            <button type="submit" class="btn btn-primary">Buscar Restaurante</button>
        `;
        return form;
    };

    // Agregar formulario al DOM
    const formContainer = document.querySelector('.form-container');
    formContainer.appendChild(createForm());

    // Capturar eventos del formulario
    const searchRestaurant = (event) => {
        event.preventDefault();
        const restaurantName = document.getElementById('restaurantName').value.trim();
        const foundRestaurant = findRestaurantByName(restaurantName);

        if (foundRestaurant) {
            displayRestaurants([foundRestaurant]);
        } else {
            alert('Restaurante no encontrado.');
        }
    };

    // Asociar evento de búsqueda al formulario
    const form = formContainer.querySelector('form');
    form.addEventListener('submit', searchRestaurant);

    // Función para buscar restaurante por nombre
    const findRestaurantByName = (name) => {
        return restaurants.find((restaurant) => restaurant.name.toLowerCase() === name.toLowerCase());
    };

    // Almacenamiento y recuperación de datos en localStorage utilizando JSON
    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const retrieveFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    // Ejemplo de uso del almacenamiento en localStorage
    const key = 'restaurantData';
    saveToLocalStorage(key, restaurants);
    const retrievedData = retrieveFromLocalStorage(key);
    console.log('Datos recuperados del localStorage:', retrievedData);

    // Optimización con desestructuración y operadores lógicos
    const calculateTotal = (quantity, pricePerUnit) => quantity * pricePerUnit;
    const isPositive = (number) => number > 0;

    const order = {
        food: '',
        drink: '',
        quantity: 0,
        comment: ''
    };

    order.food = prompt('¿Qué comida te gustaría pedir?');
    order.drink = prompt('¿Qué bebida te gustaría pedir?');
    order.quantity = parseInt(prompt('¿Cuántas unidades deseas pedir?'), 10);
    order.comment = prompt('¿Algún comentario adicional para tu orden?');

    const isValid = Object.values(order).every(value => value !== '' && (typeof value !== 'number' || isPositive(value)));

    if (isValid) {
        const pricePerUnit = 5; // Suponiendo un precio fijo por unidad
        const totalPrice = calculateTotal(order.quantity, pricePerUnit);
        const hasComment = order.comment.length > 0;

        console.log(`Comida: ${order.food}`);
        console.log(`Bebida: ${order.drink}`);
        console.log(`Cantidad: ${order.quantity}`);
        console.log(`Comentario: ${order.comment}`);
        console.log(`Precio total: $${totalPrice}`);
        console.log(`Tiene comentario: ${hasComment}`);

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
