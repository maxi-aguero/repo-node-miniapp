import { productosDB, Producto } from '../models/productoModel.js';

export const obtenerTodos = () => {
    return productosDB;
};

export const obtenerPorId = (id) => {
    return productosDB.find(producto => producto.id === id);
};

export const crearProducto = (data) => {
    const nuevo=new Producto(data.id, data.name, data.price);
    productosDB.push(nuevo);
    return nuevo;
};