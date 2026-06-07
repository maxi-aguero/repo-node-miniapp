import express from 'express';

const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.get('/productos', (req, res) => {
    res.send('Página de productos');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


/***
const server = app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Cerrar el servidor después de 10 segundos
setTimeout(() => {
    server.close(() => {
        console.log('Servidor detenido');
    });
}, 10000);

***/