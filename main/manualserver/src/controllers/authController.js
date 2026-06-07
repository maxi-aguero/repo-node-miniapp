import { autenticarUsuario } from '../services/authServices.js';

export const login = (req, res) => {

    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            mensaje: 'Error 400: Bad Request - Debe enviar email y password'
        });
    }

    const token = autenticarUsuario(email, password);

    if (token) {
        return res.status(200).json({
            mensaje: '200 OK - Login exitoso',
            token
        });
    }

    return res.status(401).json({
        mensaje: 'Error 401: Unauthorized - Credenciales inválidas'
    });
};