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

        // Notificación de resultados en forma de salida
        resultDisplay.innerHTML = results;
    };

    // Agregar evento al formulario
    form.addEventListener('submit', processForm);
});


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