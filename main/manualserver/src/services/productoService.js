import {
    getAllProductos,
    getProductoById,
    createProducto
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