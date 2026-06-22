import express from 'express';
import {getProductosController, getProductoByIdController, createProductoController, deleteProductoController,actualizarProductoController} from '../controllers/productosController.js';
import verificarTokenMiddleware from '../middlewares/verificarToken.js';

const router = express.Router();
/**
 *  Rutas para manejar productos:
 *  - GET /api/productos: Obtener todos los productos (requiere token)
 *  - GET /api/productos/:id: Obtener un producto por ID (requiere token)
 *  - POST /api/productos/create: Crear un nuevo producto (requiere token)
 *  - DELETE /api/productos/delete/:id: Eliminar un producto por ID (requiere token)
 * 
 */
router.get('/', verificarTokenMiddleware, getProductosController);
router.get('/:id', verificarTokenMiddleware, getProductoByIdController);
router.post('/create', verificarTokenMiddleware, createProductoController);
router.delete('/delete/:id', verificarTokenMiddleware, deleteProductoController);
router.put('/:id', verificarTokenMiddleware, actualizarProductoController);


export default router;
