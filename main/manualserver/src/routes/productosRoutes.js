import express from 'express';
import {getProductosController, getProductoByIdController, createProductoController, deleteProductoController} from '../controllers/productosController.js';
import verificarTokenMiddleware from '../middlewares/verificarToken.js';

const router = express.Router();


// ruta: /api/productos 
/**verificarTokenMiddleware es un middleware que se ejecuta antes de los controladores
 para asegurar que el usuario esté autenticado  ***/
 
router.get('/', verificarTokenMiddleware, getProductosController);
router.get('/:id', verificarTokenMiddleware, getProductoByIdController);
router.post('/create', verificarTokenMiddleware, createProductoController);
router.delete('/delete/:id', verificarTokenMiddleware, deleteProductoController);


export default router;
