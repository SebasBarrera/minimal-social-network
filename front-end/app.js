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

document.getElementById('post-button').addEventListener('click', async () => {
    const messageContent = document.getElementById('message-content').value;

    try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        const response = await fetch('https://eo54e0tjwa.execute-api.us-east-1.amazonaws.com', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageContent })
        });

        if (response.ok) {
            alert('Mensaje publicado');
            fetchMessages(); 
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        alert('Error al publicar el mensaje: ' + error.message);
    }
});


async function fetchMessages() {
    try {
        const session = await Auth.currentSession();
        const token = session.getIdToken().getJwtToken();

        const response = await fetch('https://eo54e0tjwa.execute-api.us-east-1.amazonaws.com/messages', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        const messages = await response.json();
        const messagesList = document.getElementById('messages-list');
        messagesList.innerHTML = '';

        messages.forEach(msg => {
            const listItem = document.createElement('li');
            listItem.textContent = `[${msg.timestamp}] ${msg.userEmail}: ${msg.message}`;
            messagesList.appendChild(listItem);
        });
    } catch (error) {
        alert('Error al obtener los mensajes: ' + error.message);
    }
}

setInterval(fetchMessages, 5000);
