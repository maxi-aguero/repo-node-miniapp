import express from 'express';
import {getProductos, getProductoById, createProducto} from '../controllers/productosController.js';
import{verificarToken} from '../middlewares/verificarToken.js';


const router = express.Router();


// ruta: /api/productos
  
router.get('/', verificarToken, getProductos);
router.get('/:id', verificarToken, getProductoById);
router.post('/new', verificarToken, createProducto);

export default router;
