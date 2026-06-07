import * as productosService from '../services/productoService.js';

export const getProductos = (req, res) => {
    const productos = productosService.obtenerTodos();

    res.json({
        mensaje: 'Recursos obtenidos con éxito',
        productos
    });
};

export const getProductoById = (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            mensaje: 'El id debe ser un número'
        });
    }

    const producto = productosService.obtenerPorId(id);

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    res.json({
        mensaje: 'Producto solicitado',
        producto
    });
};


function validarProducto(producto) {

    const { id, name, price } = producto;

    if (typeof id !== 'number')
        throw new Error('El id debe ser numérico');

    if (typeof name !== 'string'||name.trim() === '')
        throw new Error('El name debe ser texto');

    if (typeof price !== 'number'||price <= 0)
        throw new Error('El price debe ser un número positivo');
}



export const createProducto = (req, res) => {
    try {

        validarProducto(req.body);

        const nuevo = productosService.crearProducto(req.body);

        res.status(201).json({
            mensaje: 'Producto creado con éxito',
            nuevo
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

