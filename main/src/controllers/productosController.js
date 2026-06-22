import {obtenerTodosProductosService,obtenerProductoPorIdService,crearProductoService,eliminarProductoService} from '../services/productoService.js';

/**
 *  Controla si los datos del productos (title,price,category) esten correctos
 **/
function validarDatosProducto(producto) {
    const { title, price, category } = producto;

    if (typeof title !== 'string' || title.trim() === '') {
        throw new Error('El title debe ser texto y no estar vacio');
    }

    if (typeof price !== 'number' || price <= 0) {
        throw new Error('El price debe ser un numero positivo');
    }
    if (typeof category !== 'string' || category.trim() === '') {
        throw new Error('La category debe ser texto y no estar vacia');
    }
}

/**
 * Llama al servicio obtenerTodosProductosService para obtener todos los productos almacenados.
 *    
 *     Si la operación es exitosa, devuelve un código de estado 200 (OK)
 * junto con un objeto JSON que contiene un mensaje de éxito y la lista de productos.
 *     En caso que la operacion falle, delega el manejo de error su middleware.
 */
export const getProductosController = async (req, res, next) => {
    try {
        const misproductos = await obtenerTodosProductosService();

        res.status(200).json({
            mensaje: 'Recursos obtenidos con éxito',
            misproductos
        });

    } catch (error) {
       next(error);
    }
};

/**
 * Llama al servicio obtenerProductoPorIdService para obtener un
 * producto cuyo ID se le pasa por parámetro.
 * 
 *     Si no encuentra el producto, devuelve un código de estado 404 (Not Found)
 * junto con un objeto JSON que contiene un mensaje de error y valor null.
 *     Si el producto es encontrado, devuelve un código de estado 200 (OK)
 * junto con un objeto JSON que contiene un mensaje de éxito y el producto solicitado.
 * En caso de que la operación falle, delega el manejo de error a su middleware.
 */
export const getProductoByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const miproductosolicitado = await obtenerProductoPorIdService(id);

        if (!miproductosolicitado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado',
                miproductosolicitado
            });
        }

        res.status(200).json({
            mensaje: 'Producto solicitado',
            miproductosolicitado
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Se encarga de validar los datos recibidos y llamar al servicio crearProductoService 
 * para registrar un nuevo producto.
 * 
 *        Si la validación falla, responde con un código de estado 400 (Bad Request) 
 * y el detalle del error.
 *        Si el producto se crea con éxito, devuelve un código de estado 201 (Created)
 * junto con un objeto JSON que contiene un mensaje de éxito y al producto creado.
 * En caso de que el servicio falle, delega el manejo del error a su middleware.
 */
export const createProductoController = async (req, res, next) => {
   
    try {
        validarDatosProducto(req.body);
    } catch (error) {
        
                        return res.status(400).json({
                            mensaje: error.message
                        });
    }

    
      try {
                
        const nuevoproducto = req.body;
        const miproductonuevo = await crearProductoService(nuevoproducto);

        res.status(201).json({
            mensaje: 'Producto creado con éxito',
            miproductonuevo
        });

    } 
    
    catch (error) {  

        next(error);
    }
};


/**
 * Se encarga de llamar al servicio eliminarProductoService para eliminar 
 * el producto cuyo ID le fue pasado por parametro.
 * 
 *       Si el servicio no encuentra el producto, devuelve un código de estado 404 (Not Found)
 * junto con el resultado de la búsqueda vacia.
 *       Si el producto es encontrado y eliminado, devuelve un código de estado 200 (OK)
 * y un objeto JSON con un mensaje de éxito y los datos del producto eliminado.
 * * En caso de que el servicio falle, delega el manejo del error a su middleware.
 */
export const deleteProductoController  = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await eliminarProductoService(id);       

        console.log(result);
        
        if (!result) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado para eliminar', 
                miproductoaeliminar: null //retorna null
            });
        }

      

        return res.status(200).json({
            mensaje:'Producto eliminado correctamente',
            miproductoaeliminar: result
            
        });

    } catch (error) {
        next(error);
    }
};


