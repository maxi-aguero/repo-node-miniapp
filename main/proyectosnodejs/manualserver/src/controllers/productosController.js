import * as productosService from '../services/productoService.js';

export const getProductos = (req, res) => {
    const productos = productosService.obtenerTodos();
    res.json({ mensaje: 'Recursos obtenidos con exito', productos });  
};

export const getProductoById = (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productosService.obtenerPorId(id);
    if (!producto) {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    } 
    
    res.json({ mensaje: 'Producto solicitado', producto });
    };

export const createProducto = (req, res) => {
    const nuevo= productosService.crearProducto(req.body);
    res.status(201).json({ mensaje: 'Producto creado con exito', nuevo });
};
