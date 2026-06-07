import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {defaultUser} from '../models/userModel.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export const autenticarUsuario = (email,password)=>{

    let token = null;
    if (email == defaultUser.email && password==defaultUser.password){
       token = jwt.sign({email: defaultUser.email}, JWT_SECRET_KEY, {expiresIn: '1h'});
       console.log('Usuario autenticado exitosamente');
       console.log(token);// imprimo el token para usar como pruebas
    }
    return token;
}