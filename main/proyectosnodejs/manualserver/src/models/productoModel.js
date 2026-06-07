export class Producto {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    
}};
export const productosDB = [
    new Producto(1, 'Laptop', 999.99),
    new Producto(2, 'Smartphone', 499.99),
    new Producto(3, 'Headphones', 199.99)
];   

