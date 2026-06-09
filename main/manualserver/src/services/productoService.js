import {getAllProductos,getProductoById,createProducto,deleteProducto} from '../models/productoModel.js';

export const obtenerTodosProductosService = async () => {
    return await getAllProductos();
};

export const obtenerProductoPorIdService = async (id) => {
    return await getProductoById(id);
};

export const crearProductoService = async (data) => {
    return await createProducto(data);
};

export const eliminarProductoService = async (id) => {  
        return await deleteProducto(id);    
};