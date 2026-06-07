import * as productosService from '../services/productoService.js';

export const getProductos = async (req, res) => {
    try {
        const productos = await productosService.obtenerTodos();

        res.json({
            mensaje: 'Recursos obtenidos con éxito',
            productos
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const id = req.params.id;

        const producto = await productosService.obtenerPorId(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto solicitado',
            producto
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

function validarProducto(producto) {
    const { name, price } = producto;

    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('El name debe ser texto y no estar vacío');
    }

    if (typeof price !== 'number' || price <= 0) {
        throw new Error('El price debe ser un número positivo');
    }
}

export const createProducto = async (req, res) => {
    try {
        validarProducto(req.body);

        const nuevo = await productosService.crearProducto(req.body);

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