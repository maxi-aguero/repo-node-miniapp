/***Archivo solo para usos de prueba
 * Se ejecuta con node seed.js para cargar productos de prueba del documento 'products'
 * 
 */

import db from './src/data/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const productos = [
    { title: 'Laptop', price: 991939.39 ,category: 'Tecno'},
    { title: 'Smartphone', price: 490019.99, category: 'Tecno' , stock:8},
    { title: 'Pañales', price: 11121.00, category: 'Supermercado',enoferta: true },
    { title: 'Yerba', price: 4622.87, category: 'Supermercado' },
    { title: 'Cortadora de cesped', price: 169000.19, category: 'Herramientas' },
    { title: 'Bordeadora', price: 71239.14, category: 'Herramientas' }
];

async function seed() {
    try {
        for (const producto of productos) {
            await addDoc(
                collection(db, 'products'),
                producto
            );
        }

        console.log('Productos cargados');
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

seed();