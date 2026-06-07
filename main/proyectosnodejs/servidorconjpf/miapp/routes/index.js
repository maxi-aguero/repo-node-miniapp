import express from 'express';

const router = express.Router();

router.get('/hola', (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send('Hola desde el servidor Express,estoy en index.js!');
});

router.get('/saludo', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Saludo</title>
      </head>
      <body>
        <h1>¡Hola desde el servidor Express!</h1>
        <p>Este es un saludo desde la ruta /saludo.</p>
      </body>
    </html>
  `);
});
/*** 
router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});
*/
/***
router.get('/style.css', (req, res) => {
  res.sendFile(process.cwd() + '/public/stylesheets/style.css');
});
****/

router.use(express.static('public'));

let mensajes = [];

router.get("/api/data", (req, res) => {
  res.json(mensajes);
});



export default router;