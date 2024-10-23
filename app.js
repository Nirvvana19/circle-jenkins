const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3600;

// Middleware: Permitir que Express maneje JSON y archivos estáticos
app.use(express.json());
app.use(express.static('public')); // Carpeta para archivos estáticos (e.g., imágenes, CSS)

// Función para la ruta principal
const getHomeMessage = (req, res) => {
    const welcomeMessage = `
        <h1>👋 Hola Soy Mafe!</h1>
        <p>¡Bienvenida a tu aplicación Express!</p>
        <p>Visita otras rutas para ver más contenido interactivo.</p>
        <p>Prueba: <a href="/about">Acerca de</a> o <a href="/contact">Contacto</a></p>
    `;
    res.send(welcomeMessage);
};

// Rutas
app.get('/', getHomeMessage);

app.get('/about', (req, res) => {
    res.send(`
        <h2>Acerca de Soy Mafe</h2>
        <p>Esta es una aplicación interactiva construida con Express.js. ¡Espero que te guste!</p>
        <p>Volver a <a href="/">Inicio</a></p>
    `);
});

app.get('/contact', (req, res) => {
    res.send(`
        <h2>Contacto</h2>
        <p>Si deseas ponerte en contacto, escríbenos a: <strong>soymafe@prod.com</strong></p>
        <p>Volver a <a href="/">Inicio</a></p>
    `);
});

// Endpoint de salud
app.get('/health', (req, res) => {
    res.status(200).send('OK'); // Puedes personalizar el estado y el mensaje
});

// Endpoint de disponibilidad
app.get('/ready', (req, res) => {
    res.status(200).send('Ready'); // Este también puede ser personalizado
});

// Middleware para manejar JSON
app.use(express.json());

// Ruta para manejar POST /upload

const path = require('path');

app.post('/upload', (req, res) => {
    const data = req.body.data;
    const filePath = path.join('/app/data', 'data.txt');

    fs.appendFile(filePath, data + '\n', (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error al guardar los datos');
        }
        res.send('Datos recibidos y guardados!');
    });
});



// Nueva ruta para mostrar el pod que sirve la solicitud
app.get('/whoami', (req, res) => {
    const podName = process.env.HOSTNAME || 'Pod desconocido';
    res.send(`
        <h2>¿Quién soy?</h2>
        <p>Esta solicitud fue servida por el pod: <strong>${podName}</strong></p>
        <p>Volver a <a href="/">Inicio</a></p>
    `);
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).send(`
        <h2>404 - Página no encontrada</h2>
        <p>Lo siento, la página que buscas no existe.</p>
        <p>Volver a <a href="/">Inicio</a></p>
    `);
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
