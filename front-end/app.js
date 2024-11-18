// app.js
import { Amplify, Auth } from 'https://cdn.jsdelivr.net/npm/aws-amplify@4.6.1/dist/aws-amplify.min.js';

Amplify.configure({
    Auth: {
        userPoolId: 'us-east-1_fT7fwBOCq', // Reemplaza con tu User Pool ID
        userPoolWebClientId: '3172jrrcl2f03qmopd6udio5', // Reemplaza con tu App Client ID
        region: 'us-east-1' // Reemplaza con tu región, por ejemplo, 'us-east-1'
    }
});

document.getElementById('register-button').addEventListener('click', async () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        await Auth.signUp({
            username: email,
            password: password,
        });
        alert('Registro exitoso. Por favor, verifica tu email.');
    } catch (error) {
        alert('Error en el registro: ' + error.message);
    }
});

document.getElementById('login-button').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await Auth.signIn(email, password);
        alert('Inicio de sesión exitoso');
        document.getElementById('auth').style.display = 'none';
        document.getElementById('social').style.display = 'block';
        fetchMessages();
    } catch (error) {
        alert('Error en el inicio de sesión: ' + error.message);
    }
});

// Funciones adicionales se agregarán más adelante
