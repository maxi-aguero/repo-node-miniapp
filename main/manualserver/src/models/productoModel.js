import { db } from '../data/data.js';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    doc,deleteDoc
} from 'firebase/firestore';



const productosCollection = collection(db, 'products');

export async function getAllProductos() {
    const querySnapshot = await getDocs(productosCollection);

    const productos = [];

    querySnapshot.forEach((documento) => {
        productos.push({
            id: documento.id,
            ...documento.data()
        });
    });

    return productos;
}

export async function getProductoById(id) {
    const productoRef = doc(db, 'products', id);

    const productoSnap = await getDoc(productoRef);

    if (!productoSnap.exists()) {
        return null;
    }

    return {
        id: productoSnap.id,
        ...productoSnap.data()
    };
}

export async function createProducto(producto) {
    const docRef = await addDoc(productosCollection, {
        name: producto.name,
        price: producto.price
    });

    return {
        id: docRef.id,
        name: producto.name,
        price: producto.price
    };
}


export async function deleteProducto(id) {
    console.log('Intentando eliminar producto con ID:', id);
    const productoRef = doc(db, 'products', id);

    const snap = await getDoc(productoRef);

    let producto = null;

    
    if (!snap.exists()) {
        return {
            producto: producto,
            mensaje: 'Producto no encontrado'
        };
    }

    producto = {
        id: snap.id,
        ...snap.data()
    };

    await deleteDoc(productoRef);

    return {
        producto,
        mensaje: 'Producto eliminado correctamente'
    };
}

