export class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}

export const defaultUser = new User(1, 'user@email.com', 'StrongPass123');