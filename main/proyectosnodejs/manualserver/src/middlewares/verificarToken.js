import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token' });   
    }
    try {
        const datosUsuarioEncriptados = jwt.verify(token, JWT_SECRET_KEY);
        req.user = datosUsuarioEncriptados; 
        next(); 
    }
    catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' }); 
    }
};

