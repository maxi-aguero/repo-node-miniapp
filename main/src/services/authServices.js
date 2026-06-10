import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {miUsuarioFicticio} from '../models/userModel.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/**
 * Función para autenticar a un usuario. 
 * Compara las credenciales proporcionadas vs un usuario ficticio 
 * y, si coinciden, genera un token JWT válido por 1 hora. 
 * 
 */

export const autenticarUsuario = (email,password)=>{

    let token = null;
    if (email == miUsuarioFicticio.email && password==miUsuarioFicticio.password){
       token = jwt.sign({email: miUsuarioFicticio.email}, JWT_SECRET_KEY, {expiresIn: '1h'});
       console.log('Usuario autenticado exitosamente');
    }
    return token;
}