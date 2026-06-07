import * as productosService from '../services/productoService.js';

function validarProducto(producto) {
    const { name, price } = producto;

    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('El name debe ser texto y no estar vacío');
    }

    if (typeof price !== 'number' || price <= 0) {
        throw new Error('El price debe ser un número positivo');
    }
}


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
        const { id } = req.params;

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



export const createProducto = async (req, res) => {
    try {
        const { name, price } = req.body;
        validarProducto({ name, price });

        const nuevo = await productosService.crearProducto({ name, price });

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

export const deleteProducto = async (req, res) => {
    try {
        console.log('Recibida solicitud para eliminar producto');
        const { id } = req.params;

        const result = await productosService.eliminarProducto(id);

        if (!result.producto) {
            return res.status(404).json({
                mensaje: result.mensaje,
                producto: null
            });
        }

        return res.json({
            mensaje: result.mensaje,
            producto: result.producto
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: error.message,
            producto: null
        });
    }
};


