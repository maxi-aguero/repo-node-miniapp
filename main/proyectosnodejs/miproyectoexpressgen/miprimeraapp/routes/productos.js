import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Listado de productos');
});

router.get('/ofertas', (req, res) => {
  res.send('Productos en oferta');
});

export default router;