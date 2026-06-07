import { autenticarUsuario } from '../services/authServices.js';

export const login = (req, res) => {

    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            mensaje: 'Debe enviar email y password'
        });
    }

    const token = autenticarUsuario(email, password);

    if (token) {
        return res.json({
            mensaje: 'Login exitoso',
            token
        });
    }

    return res.status(401).json({
        mensaje: 'Credenciales inválidas'
    });
};