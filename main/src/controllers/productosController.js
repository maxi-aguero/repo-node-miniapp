import {obtenerTodosProductosService,obtenerProductoPorIdService,crearProductoService,eliminarProductoService} from '../services/productoService.js';
/**
 *  Controla si los datos del productos estan completos
 *  
 */
function validarDatosProducto(producto) {
    const { title, price, category } = producto;

    if (typeof title !== 'string' || title.trim() === '') {
        throw new Error('El title debe ser texto y no estar vacío');
    }

    if (typeof price !== 'number' || price <= 0) {
        throw new Error('El price debe ser un número positivo');
    }
    if (typeof category !== 'string' || category.trim() === '') {
        throw new Error('La category debe ser texto y no estar vacía');
    }
}


export const getProductosController = async (req, res, next) => {
    try {
        const productos = await obtenerTodosProductosService();

        res.status(200).json({
            mensaje: 'Recursos obtenidos con éxito',
            productos
        });

    } catch (error) {
       next(error);
    }
};

export const getProductoByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const producto = await obtenerProductoPorIdService(id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado',
                producto
            });
        }

        res.status(200).json({
            mensaje: 'Producto solicitado',
            producto
        });

    } catch (error) {
        next(error);
    }
};


export const createProductoController = async (req, res, next) => {
   
    try {
        validarDatosProducto(req.body);
    } catch (error) {
        
        return res.status(400).json({
            mensaje: error.message
        });
    }

    
      try {           
        const nuevoproducto = {
            title: req.body.title,
            price: req.body.price,
            category: req.body.category
        };

        const nuevo = await crearProductoService(nuevoproducto);

        res.status(201).json({
            mensaje: 'Producto creado con éxito',
            nuevo
        });

    } 
    
    catch (error) {  

        next(error);
    }
};

export const deleteProductoController  = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await eliminarProductoService(id);

        if (!result.producto) {
            return res.status(404).json({
                mensaje: result.mensaje,
                producto: result.producto
            });
        }

        return res.status(200).json({
            mensaje: result.mensaje,
            producto: result.producto
        });

    } catch (error) {
        next(error);
    }
};


