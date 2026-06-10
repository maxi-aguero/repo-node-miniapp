/***Archivo solo para usos de prueba
 * Se ejecuta con node seed.js para cargar productos de prueba en la base de datos
 * 
 */

import { db } from './src/data/data.js';
import { collection, addDoc } from 'firebase/firestore';

const productos = [
    { title: 'Laptop', price: 999.99 ,category: 'Tecno'},
    { title: 'Smartphone', price: 499.99, category: 'Tecno' },
    { title: 'Headphones', price: 199.99, category: 'Tecno' }
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