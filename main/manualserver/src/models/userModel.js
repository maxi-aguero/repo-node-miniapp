export class User {
    
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

export const defaultUser = new User('user@email.com', 'StrongPass123');