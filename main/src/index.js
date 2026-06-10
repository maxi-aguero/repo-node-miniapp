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

/**
 * Rutas para productos y autenticación
 * - /api/products: Rutas relacionadas con productos (CRUD)
 * - /auth: Rutas relacionadas con autenticación (login)
 * 
 */
app.use('/api/products', productosRoutes);
app.use('/auth', authRoutes);

/**
 * Manejo de errores:
 * - 404: Ruta no encontrada
 * - 400: JSON inválido en la solicitud
 * - 500: Error interno del servidor  
 * Midleware para manejar errores comunes y enviar respuestas JSON con mensajes de error.
 * Esto mejora la experiencia del cliente al proporcionar información útil sobre lo que salió mal.
 * 
 */
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


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}


export default app;


