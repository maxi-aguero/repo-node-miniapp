import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Respuesta de la ruta /users');
});

export default router;