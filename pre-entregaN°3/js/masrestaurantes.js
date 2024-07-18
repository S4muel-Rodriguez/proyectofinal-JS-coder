document.addEventListener('DOMContentLoaded', () => {
    // Declaración de arrays y objetos
    const restaurants = [
        { name: 'Pin Pun', url: 'https://www.instagram.com/pinpunlomas/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.6760245829523!2d-58.408907023483444!3d-34.76375307289744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd3193abd8235%3A0xf355be1ab3f3056a!2sPin%20Pun!5e0!3m2!1ses-419!2sar!4v1712711353899!5m2!1ses-419!2sar' },
        { name: 'Las Medialunas del Abuelo', url: 'https://www.instagram.com/lasmedialunasdelabuelo/', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.8284902288997!2d-58.405567016866655!3d-34.75991299655742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd2920b587939%3A0x62696178577701d1!2sLas%20Medialunas%20del%20Abuelo!5e0!3m2!1ses-419!2sar!4v1712711501699!5m2!1ses-419!2sar' }
    ];

    // Función para mostrar restaurantes en el dom
    const displayRestaurants = (restaurants) => {
        const main = document.querySelector('main');
        main.innerHTML = '<h2>Redes sociales de los restaurante:</h2>';

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

    // Capturar eventos del dom
    document.querySelector('.nav-list').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            alert(`Navegando a ${event.target.textContent}`);
        }
    });

    // Función buscando restuarante
    const findRestaurantByName = (name) => {
        return restaurants.find((restaurant) => restaurant.name.toLowerCase() === name.toLowerCase());
    };

    // buscar restaurante
    const searchRestaurant = () => {
        const restaurantName = prompt('Introduce el nombre del restaurante que deseas buscar:');
        const foundRestaurant = findRestaurantByName(restaurantName);

        if (foundRestaurant) {
            displayRestaurants([foundRestaurant]);
        } else {
            alert('Restaurante no encontrado.');
        }
    };

    //  botón de búsqueda de restaurantes
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
});

// Almacenamiento en localStorage
const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const retrieveFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

// Ejemplo de uso del almacenamiento
const key = 'dato de restaurante';
saveToLocalStorage(key, restaurants);
const retrievedData = retrieveFromLocalStorage(key);
console.log('Datos recuperados del localStorage:', retrievedData);
