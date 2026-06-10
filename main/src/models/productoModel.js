import db from '../data/firebase.js';
import {collection,getDocs,getDoc,addDoc,doc,deleteDoc} from 'firebase/firestore';

const productosCollection = collection(db, 'products');
/**
 * Obtiene todos los productos de la colección "products" en Firestore.
 * Devuelve una promesa que se resuelve con un array de productos.
 * El array de objetos de productos lleva su id, title, price y category. 
 *  
 */
export async function getAllProductos() {
    const querySnapshot = await getDocs(productosCollection);

    const productos = [];

    querySnapshot.forEach((documento) => {
        const data = documento.data();
        productos.push({
            id: documento.id,
            title: data.title,
            price: data.price,
            category: data.category            
        });
    });

    return productos;
}
/**
 * Obtiene un producto por su ID de la colección "products" en Firestore.
 * Devuelve una promesa que se resuelve con el producto encontrado o null si no existe.
 * El producto devuelto es un objeto con su id, title, price y category.
 */

export async function getProductoById(id) {
    const productoRef = doc(db, 'products', id);

    const productoSnap = await getDoc(productoRef);

    if (!productoSnap.exists()) {
        return null;
    }

    const data = productoSnap.data();
    return {
        id: productoSnap.id,
        title: data.title,
        price: data.price,
        category: data.category
    };
}
/**
 * Crea un nuevo producto en la colección "products" de Firestore.
 * Recibe un objeto producto con las propiedades title, price y category.
 * Devuelve una promesa que resulta ser el producto creado e  incluyendo su id
 *  
 */

export async function createProducto(producto) {

    const docRef = await addDoc(productosCollection, {
        title: producto.title,
        price: producto.price,
        category: producto.category
    });

    return {
        id: docRef.id,
        title: producto.title,
        price: producto.price,
        category: producto.category
    };
}

/**
 * 
 * Elimina un producto por su ID de la colección "products" en Firestore.
 * Devuelve una promesa que se resuelve con el producto eliminado o un mensaje de error si no existe.
 * El producto devuelto es un objeto con su id, title, price y category.
 */

export async function deleteProducto(id) {
    const productoRef = doc(db, 'products', id); 
    const snap = await getDoc(productoRef); 

    let producto = null;
    
    if (!snap.exists()) {
        return {
            producto: producto,
            mensaje: 'Producto no encontrado'
        };
    }
    const miproductoaeliminar = snap.data();  
    producto = {
        id: snap.id,
        title: miproductoaeliminar.title,
        price: miproductoaeliminar.price,
        category: miproductoaeliminar.category
    };

    await deleteDoc(productoRef);

    return {
        producto,
        mensaje: 'Producto eliminado correctamente'
    };
}

