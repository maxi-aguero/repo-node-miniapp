import {getAllProductos,getProductoById,createProducto,deleteProducto,actualizarProducto} from '../models/productoModel.js';
/**
 * Servicio para obtener todos los productos
 *  
 */
export const obtenerTodosProductosService = async () => {
    return await getAllProductos();
};
/**
 * Servicio para obtener un producto por su ID
 *  
 */
export const obtenerProductoPorIdService = async (id) => {
    return await getProductoById(id);
};
/**
 * Servicio para crear un nuevo producto
 * 
 */
export const crearProductoService = async (data) => {
    return await createProducto(data);
};
/**
 * Servicio para eliminar un producto por su ID
 * 
 */
export const eliminarProductoService = async (id) => {  
        return await deleteProducto(id);    
};
/**
 * Servicio para actualizar un producto
 * 
 */
export const actualizarProductoService = async (id,datosamodificar) => {  
        return await actualizarProducto(id,datosamodificar);    
};