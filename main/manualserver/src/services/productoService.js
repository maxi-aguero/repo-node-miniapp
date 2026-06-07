import {
    getAllProductos,
    getProductoById,
    createProducto,
    deleteProducto
} from '../models/productoModel.js';

export const obtenerTodos = async () => {
    return await getAllProductos();
};

export const obtenerPorId = async (id) => {
    return await getProductoById(id);
};

export const crearProducto = async (data) => {
    return await createProducto(data);
};


export const eliminarProducto = async (id) => {
    try {
        console.log('Eliminando producto con ID:', id);
        const result = await deleteProducto(id);
        
        return result;
    } catch (error) {

        return {
            producto: null,
            mensaje: 'Error interno al eliminar producto'
        };
    }
};