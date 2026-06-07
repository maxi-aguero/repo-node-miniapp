import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Promociones vigentes');
});

router.get('/hoy', (req, res) => {
  res.send('Promociones de hoy');
});

export default router;