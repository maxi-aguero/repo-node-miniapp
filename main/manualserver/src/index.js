import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
dotenv.config();

const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/api/products', productosRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    mensaje: 'Error 404: Not Found - Ruta no encontrada'
  });
});


app.use((err, req, res, next) => {
  

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      mensaje: 'Error 400: Bad Request - JSON inválido'
    });
  }

  res.status(500).json({
    mensaje: 'Error 500: Internal Server Error - Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;


