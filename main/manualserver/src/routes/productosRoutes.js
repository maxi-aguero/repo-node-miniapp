import express from 'express';
import {getProductos, getProductoById, createProducto,deleteProducto} from '../controllers/productosController.js';
import{verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();


// ruta: /api/productos 
/**verificarToken es un middleware que se ejecuta antes de los controladores
 para asegurar que el usuario esté autenticado  ***/
 
router.get('/', verificarToken, getProductos);
router.get('/:id', verificarToken, getProductoById);
router.post('/new', verificarToken, createProducto);
router.delete('/delete/:id', verificarToken, deleteProducto);


export default router;
