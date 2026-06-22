import db from '../data/firebase.js';
import {collection,getDocs,getDoc,addDoc,doc,deleteDoc} from 'firebase/firestore';

const productosCollection = collection(db, 'products');
/**
 * Va a Firestore y trae todos los productos de la colección "products"
 * y devuelve una promesa que se resuelve con un array de dichos productos.
 * En donde cada objeto del array contiene su ID y sus datos correspondientes.
 * 
 */
export async function getAllProductos() {
    const querySnapshot = await getDocs(productosCollection);

    const productos = [];

    querySnapshot.forEach((documento) => {
        const data = documento.data();
        productos.push({
            id: documento.id,
            ...data           
        });
    });

    return productos;
}

/**
 * Va a Firestore y trae un documento mediante su ID en la colección "products",
 * y devuelve una promesa que se resuelve con un objeto que contiene el ID y los datos del producto,
 * o null en caso de que el documento no exista.
 * 
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
        ...data
    };
}

/**
 * Agrega un nuevo documento producto en la coleccion "products" de Firestore.
 * Recibe un objeto producto y devuelve una promesa que 
 * resulta ser el los datos producto creado e incluyendo su id
 *
 */
export async function createProducto(producto) {

    const docRef = await addDoc(productosCollection,
        producto
    );

    return {
        id: docRef.id,
        ...producto
    };
}

/**
 * Va a Firestore y trae un documento por su ID en la coleccion 'products' para eliminarlo;
 * y devuelve una promesa que se resuelve con el ID y los datos del producto eliminado,
 * o con el valor de producto en null si el documento no exista.
 */
export async function deleteProducto(id) {
    
    const productoRef = doc(db, 'products', id); 
    const snap = await getDoc(productoRef); 

    if (!snap.exists()) 
        return          
            null;
        
    
    
    const producto = snap.data();  
   
   

    await deleteDoc(productoRef);

    return {
        id,
        ...producto
    };
}

