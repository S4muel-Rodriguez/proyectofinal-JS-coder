document.addEventListener('DOMContentLoaded', () => {
    // Cargar la librería Lodash (asegúrate de incluir el script en tu HTML)
    console.log('Lodash version:', _.VERSION); // Verifica que Lodash esté cargado

    // Declaración de arrays y objetos
    const restaurants = [
        { name: 'Pin Pun', url: 'https://www.instagram.com/pinpunlomas/', map: 'https://www.google.com/maps/embed?...' },
        { name: 'Las Medialunas del Abuelo', url: 'https://www.instagram.com/lasmedialunasdelabuelo/', map: 'https://www.google.com/maps/embed?...' }
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

    // Capturar eventos del DOM
    document.querySelector('.nav-list').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            alert(`Navegando a ${event.target.textContent}`);
        }
    });

    // Función para buscar restaurante por nombre
    const findRestaurantByName = (name) => {
        return restaurants.find((restaurant) => restaurant.name.toLowerCase() === name.toLowerCase());
    };

    // Buscar restaurante
    const searchRestaurant = () => {
        const restaurantName = prompt('Introduce el nombre del restaurante que deseas buscar:');
        const foundRestaurant = findRestaurantByName(restaurantName);

        if (foundRestaurant) {
            displayRestaurants([foundRestaurant]);
        } else {
            alert('Restaurante no encontrado.');
        }
    };

    // Botón de búsqueda de restaurantes
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Buscar Restaurante';
    searchButton.addEventListener('click', searchRestaurant);
    document.body.insertBefore(searchButton, document.querySelector('main'));

    // Bucle for para mostrar los nombres de los restaurantes en la consola
    for (let i = 0; i < restaurants.length; i++) {
        console.log(restaurants[i].name);
    }

    // Bucle while para contar cuántos restaurantes hay
    let count = 0;
    while (count < restaurants.length) {
        console.log(`Restaurante ${count + 1}: ${restaurants[count].name}`);
        count++;
    }

    // Uso de if y else para verificar si hay restaurantes
    if (restaurants.length > 0) {
        console.log('Hay restaurantes disponibles.');
    } else {
        console.log('No hay restaurantes disponibles.');
    }

    // Almacenamiento en localStorage
    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const retrieveFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    // Ejemplo de uso del almacenamiento
    const key = 'restaurantData';
    saveToLocalStorage(key, restaurants);
    const retrievedData = retrieveFromLocalStorage(key);
    console.log('Datos recuperados del localStorage:', retrievedData);

    // Cargar datos desde el archivo JSON usando fetch
    const loadRestaurants = async () => {
        try {
            const response = await fetch('pre-entregaN°3/js/masrestaurantes.js'); // Ruta del archivo JSON
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            displayRestaurants(data.restaurants);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    // Llamada a la función para cargar los datos al iniciar la página
    loadRestaurants();
});

