document.addEventListener('DOMContentLoaded', () => {
    // Declaración de arrays y objetos
    const restaurants = [
        { name: 'Pin Pun', url: 'https://www.instagram.com/pinpunlomas/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...' },
        { name: 'Las Medialunas del Abuelo', url: 'https://www.instagram.com/lasmedialunasdelabuelo/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...' }
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

// Función para mostrar la información del equipo
const displayTeam = (team) => {
    const main = document.querySelector('main');
    main.innerHTML = '<h2>Conoce a Nuestro Equipo:</h2>';

    team.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';

        const photo = document.createElement('img');
        photo.src = member.photo;
        photo.alt = `Foto de ${member.name}`;
        photo.style.width = '150px'; // Ajusta el tamaño según sea necesario

        const name = document.createElement('h3');
        name.textContent = member.name;

        const role = document.createElement('h4');
        role.textContent = member.role;

        const bio = document.createElement('p');
        bio.textContent = member.bio;

        memberDiv.appendChild(photo);
        memberDiv.appendChild(name);
        memberDiv.appendChild(role);
        memberDiv.appendChild(bio);

        main.appendChild(memberDiv);
    });
};

// Cargar datos desde el archivo JSON usando fetch
const loadTeamData = async () => {
    const loadingMessage = document.getElementById('loading');
    loadingMessage.style.display = 'block'; // Mostrar mensaje de carga

    try {
        const response = await fetch('pre-entregaN°3/js/nosotros.json');
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Suponiendo que contiene los datos del equipo
        displayTeam(data.team);

    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('No se pudo cargar la información del equipo. Por favor, intenta de nuevo más tarde.');
    } finally {
        loadingMessage.style.display = 'none'; // Ocultar mensaje de carga
    }
};

// Llamada a la función para cargar los datos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadTeamData();
});


