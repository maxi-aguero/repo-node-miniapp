import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Listado de usuarios');
});

router.get('/nuevo', (req, res) => {
  res.send('Alta de usuario');
});

export default router;
