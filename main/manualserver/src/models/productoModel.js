import { db } from '../data/data.js';
import {collection,getDocs,getDoc,addDoc,doc,deleteDoc} from 'firebase/firestore';

const productosCollection = collection(db, 'products');

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

export async function createProducto(producto) {
/***Dejo que se puede agregar productos repetidos , pero tiene id autogenerado diferente
ejemplo { title: 'Fideos', price: 100,category: 'food' }{title: 'Fideos', price: 100,category: 'food' }
ambos se pueden agregar pero internamente tienen id diferente***/

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


export async function deleteProducto(id) {
    /***busca un id dentro de la coleccion y devuelve su referencia ***/
    const productoRef = doc(db, 'products', id); 
    /***me dice si el documento existe o no, y si existe devuelve su contenido */
    const snap = await getDoc(productoRef); 

    let producto = null;
    
    if (!snap.exists()) {
        return {
            producto: producto,
            mensaje: 'Producto no encontrado'
        };
    }
    const miproductoaeliminar = snap.data(); //ya me asegure que tenga datos snap.data() 
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

