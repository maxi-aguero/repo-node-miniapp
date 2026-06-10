import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/**
 * 
 * Middleware para verificar el token JWT en las solicitudes protegidas.
 * Verifica la validez del token y, si es válido, adjunta los datos del usuario al objeto de solicitud.
 * Si el token no es válido o ha expirado, devuelve una respuesta de error.
 */

const verificarTokenMiddleware = (req, res, next) => {
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

export default verificarTokenMiddleware;
