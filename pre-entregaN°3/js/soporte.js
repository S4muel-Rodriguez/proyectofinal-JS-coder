document.addEventListener('DOMContentLoaded', () => {
    // Captura de elementos del DOM
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.querySelector('.contraseña_input');
    const messageInput = document.getElementById('message');
    const form = document.querySelector('form');
    const resultDisplay = document.createElement('div');
    document.body.appendChild(resultDisplay);

    // Función para capturar y procesar entradas del usuario
    const processForm = (event) => {
        event.preventDefault();

        // Captura de entradas del usuario
        const inputs = [
            { name: 'Nombre', value: nameInput.value },
            { name: 'Email', value: emailInput.value },
            { name: 'Contraseña', value: passwordInput.value },
            { name: 'Mensaje', value: messageInput.value }
        ];

        // Procesamiento esencial del simulador
        let results = 'Resultados del formulario:<br>';
        inputs.forEach(input => {
            results += `${input.name}: ${input.value}<br>`;
        });

        // Guardar datos en localStorage
        saveToLocalStorage('formData', inputs);

        // Notificación de resultados en forma de salida
        resultDisplay.innerHTML = results;
    };

    // Función para guardar datos en localStorage
    const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    // Función para recuperar datos de localStorage al cargar la página
    const retrieveFormDataFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    // Recuperar datos del localStorage al cargar la página
    const storedFormData = retrieveFormDataFromLocalStorage('formData');
    if (storedFormData) {
        nameInput.value = storedFormData[0].value;
        emailInput.value = storedFormData[1].value;
        passwordInput.value = storedFormData[2].value;
        messageInput.value = storedFormData[3].value;
    }

    // Agregar evento al formulario
    form.addEventListener('submit', processForm);

    // Crear formulario de búsqueda y agregarlo al DOM
    const createSearchForm = () => {
        const searchForm = document.createElement('form');
        searchForm.innerHTML = `
            <div class="mb-3">
                <label for="search" class="form-label">Buscar:</label>
                <input type="text" class="form-control" id="search" required>
            </div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        `;
        return searchForm;
    };

    // Agregar el formulario de búsqueda al DOM
    const searchFormContainer = document.createElement('div');
    searchFormContainer.className = 'search-form-container';
    document.body.appendChild(searchFormContainer);
    searchFormContainer.appendChild(createSearchForm());

    // Manejar el evento de búsqueda
    const searchHandler = async (event) => {
        event.preventDefault();
        const searchValue = document.getElementById('search').value.trim();

        if (searchValue) {
            try {
                const response = await axios.get(`https://api.example.com/search?query=${searchValue}`);
                if (response.status === 200) {
                    const data = response.data;
                    // Mostrar los resultados de la búsqueda
                    resultDisplay.innerHTML = `<h2>Resultados de la búsqueda:</h2>${JSON.stringify(data, null, 2)}`;
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                resultDisplay.innerHTML = 'No se pudo obtener la información. Por favor, intenta de nuevo más tarde.';
            }
        }
    };

    // Asociar el evento de búsqueda al formulario
    const searchForm = searchFormContainer.querySelector('form');
    searchForm.addEventListener('submit', searchHandler);

    // Función para cargar datos desde un JSON local
    const loadLocalJson = async () => {
        try {
            const response = await fetch('pre-entregaN°3/js/contactos.json');
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Datos cargados desde JSON local:', data);
        } catch (error) {
            console.error('Error al cargar los datos del JSON local:', error);
        }
    };

    // Cargar datos desde el JSON local al iniciar la página
    loadLocalJson();
});
