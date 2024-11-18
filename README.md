# AWS Social Network Application

Este proyecto es una aplicación mínima similar a una red social tipo Facebook, construida utilizando los servicios serverless de AWS como AWS Lambda, AWS Amplify, Amazon API Gateway, Amazon DynamoDB y Amazon Cognito. La aplicación permite a los usuarios registrarse, autenticarse, publicar mensajes y ver los mensajes de otros usuarios en tiempo real.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Prerrequisitos](#prerrequisitos)
- [Configuración y Despliegue](#configuración-y-despliegue)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Configurar el Front-End](#2-configurar-el-front-end)
  - [3. Configurar el Back-End](#3-configurar-el-back-end)
  - [4. Desplegar el Front-End con AWS Amplify](#4-desplegar-el-front-end-con-aws-amplify)
  - [5. Configurar Amazon Cognito](#5-configurar-amazon-cognito)
  - [6. Configurar Amazon DynamoDB](#6-configurar-amazon-dynamodb)
  - [7. Configurar AWS Lambda](#7-configurar-aws-lambda)
  - [8. Configurar Amazon API Gateway](#8-configurar-amazon-api-gateway)
- [Uso de la Aplicación](#uso-de-la-aplicación)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Descripción

La aplicación permite a los usuarios:

- Registrarse y autenticarse mediante Amazon Cognito.
- Publicar mensajes que son visibles para todos los usuarios.
- Ver un feed de mensajes actualizado en tiempo real.
- Ver el número de usuarios conectados actualmente.

## Características

- **Registro y Autenticación de Usuarios**: Utilizando Amazon Cognito para gestionar los usuarios y la autenticación segura.
- **Back-End Serverless**: Funciones Lambda en JavaScript (.mjs) para manejar la lógica del negocio.
- **API RESTful**: Exposición de las funciones Lambda a través de Amazon API Gateway.
- **Base de Datos NoSQL**: Almacenamiento de mensajes en Amazon DynamoDB.
- **Actualizaciones en Tiempo Real**: Implementación de WebSockets para actualizar el feed y el número de usuarios conectados.
- **Front-End Estático**: Aplicación web desarrollada en JavaScript alojada en AWS Amplify con implementación continua desde GitHub.
- **Monorepositorio**: Código del front-end y back-end alojados en el mismo repositorio para facilitar la gestión y la colaboración.

## Arquitectura

![Arquitectura de la Aplicación](capturas/arquitectura.png)

*(Nota: Inserta aquí una imagen que muestre la arquitectura de la aplicación y cómo interactúan los diferentes servicios de AWS.)*

## Estructura del Proyecto

```
aws-social-network/
├── back-end/
│   ├── functions/
│   │   ├── getMessages.mjs
│   │   ├── postMessage.mjs
│   │   └── websocketHandler.mjs
│   ├── package.json
│   └── README.md
├── front-end/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── capturas/
│   ├── arquitectura.png
│   ├── registro.png
│   ├── inicio-sesion.png
│   ├── feed.png
│   └── publicacion.png
└── README.md
```

## Prerrequisitos

- **Cuenta de AWS**: Necesaria para acceder a los servicios de AWS mencionados.
- **Node.js y npm**: Para instalar dependencias y empaquetar las funciones Lambda.
- **Git**: Para clonar el repositorio y manejar el control de versiones.
- **Conocimientos Básicos de AWS**: Familiaridad con la consola de AWS y los servicios utilizados.

## Configuración y Despliegue

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/aws-social-network.git
cd aws-social-network
```

### 2. Configurar el Front-End

- Navega al directorio `front-end/`.
- Actualiza el archivo `app.js` con tus propios valores:

  ```javascript
  // app.js
  Amplify.configure({
      Auth: {
          userPoolId: 'us-east-1_fT7fwBOCq',
          userPoolWebClientId: '3172jrrcl2f03qmopd6udio5',
          region: 'us-east-1'
      }
  });

  const API_URL = 'https://eo54e0tjwa.execute-api.us-east-1.amazonaws.com/messages';
  const WS_URL = 'wss://lm4sjnfb2a.execute-api.us-east-1.amazonaws.com';
  ```


### 3. Configurar el Back-End

- Navega al directorio `back-end/`.
- Instala las dependencias necesarias:

  ```bash
  npm install
  ```

- Asegúrate de que las funciones Lambda en `functions/` estén correctamente configuradas y empaquetadas para su despliegue.

### 4. Desplegar el Front-End con AWS Amplify

- Inicia sesión en la consola de AWS y navega a **AWS Amplify**.
- Crea una nueva aplicación y conecta el repositorio de GitHub.
- Configura el directorio base (`front-end/`) y despliega la aplicación.
- AWS Amplify detectará automáticamente los cambios y realizará la implementación continua.

### 5. Configurar Amazon Cognito

- En la consola de AWS, navega a **Amazon Cognito**.
- Crea un nuevo **User Pool** para gestionar a los usuarios.
- Configura un **App Client** y obtén el **User Pool ID** y el **App Client ID**.
- Actualiza estos valores en tu archivo `app.js` del front-end.

### 6. Configurar Amazon DynamoDB

- Navega a **Amazon DynamoDB** en la consola de AWS.
- Crea las tablas necesarias:

  - **Messages**: Para almacenar los mensajes publicados.
    - Clave de partición: `messageId` (String).
  - **WebSocketConnections**: Para gestionar las conexiones WebSocket.
    - Clave de partición: `connectionId` (String).

### 7. Configurar AWS Lambda

- En **AWS Lambda**, crea las funciones:

  - `postMessage`: Maneja la publicación de mensajes.
  - `getMessages`: Recupera los mensajes para mostrarlos en el feed.
  - `websocketHandler`: Maneja las conexiones WebSocket.

- Sube el código de las funciones desde el directorio `back-end/functions/`.
- Configura los permisos y variables de entorno si es necesario.

### 8. Configurar Amazon API Gateway

- En **API Gateway**, crea dos APIs:

  - **API RESTful**:

    - Crea recursos y métodos para `GET /messages` y `POST /messages`.
    - Integra las funciones Lambda correspondientes.
    - Configura un autorizador de Amazon Cognito para proteger los endpoints.
    - Despliega la API y obtén el **Invoke URL**.

  - **API WebSocket**:

    - Configura rutas para `$connect`, `$disconnect` y `$default`.
    - Asocia la función Lambda `websocketHandler` a las rutas.
    - Despliega la API y obtén la **WebSocket URL**.

## Capturas de Pantalla

![Capturas](capturas/capturas.pdf)
