export class User {
    
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

export const miUsuarioFicticio = new User('user@email.com', 'StrongPass123');
