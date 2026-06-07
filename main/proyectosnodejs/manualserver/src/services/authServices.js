import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {defaultUser} from '../models/userModel.js';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


export const autenticarUsuario = (email,password)=>{

    if (email == defaultUser.email && password==defaultUser.password){
        const token = jwt.sign({id: defaultUser.id, email: defaultUser.email}, JWT_SECRET_KEY, {expiresIn: '1h'});
        return token;
    }
    return null;
}