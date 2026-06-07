
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
dotenv.config();

const PORT = 3000;


app.use(cors());
app.use(express.json());


app.use('/api/productos', productosRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;





/*****
 * 
 * 
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

console.log(process.env.JWT_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const arrproductos = [
  { id: 1, desc: 'Football' },
  { id: 2, desc: 'Mobile' },
  { id: 3, desc: 'Auto' }
];


app.get('/', (req, res) => {
  res.send('¡Hola desde el servidor manual!');
});

Obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(arrproductos);
});


// ==========================================
// 🛡️ MIDDLEWARE DE VERIFICACIÓN DE TOKEN
// ==========================================
const verificarToken = (req, res, next) => {
  // 1. Buscamos el token en los Headers de la petición
  const authHeader = req.headers['authorization'];
  
  // El header suele viajar como "Bearer EL_TOKEN_AQUÍ", así que separamos el texto
  const token = authHeader && authHeader.split(' ')[1];

  // Si el cliente no envió ningún token, le bloqueamos el paso de entrada
  if (!token) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado. No se proporcionó un token.' 
    });
  }

  try {
    // 2. Verificamos si el token es válido usando nuestra clave secreta
    const datosUsuarioEncriptados = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Guardamos los datos del usuario dentro de la petición para usarlo si queremos
    req.user = datosUsuarioEncriptados; 
    
    // ¡Todo OK! Le damos el pase libre para que continúe a la ruta
    next(); 
  } catch (error) {
    // Si el token expiró o fue alterado, rebota acá
    return res.status(403).json({ 
      mensaje: 'Token inválido o expirado.' 
    });
  }
};

// ==========================================
// 📦 RUTAS (Ahora protegida)
// ==========================================

// Modificamos esta ruta agregando 'verificarToken' en el medio
app.get('/productos', verificarToken, (req, res) => {
  // Si llegó acá, es porque el middleware le dio el 'next()'
  console.log(`Usuario autorizado accediendo: ${req.user.email}`);
  
  res.json({
    mensaje: 'Recursos obtenidos con éxito (Ruta Protegida)',
    productos: arrproductos
  });
});





 */





/***


// Login
app.post('/login', (req, res) => {

  const { email, password } = req.body;

  const defaultUser = {
    id: 1,
    email: 'user@email.com',
    password: 'StrongPass123'
  };

  if (
    email === defaultUser.email &&
    password === defaultUser.password
  ) {

    const token = jwt.sign(
      {
        id: defaultUser.id,
        email: defaultUser.email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return res.json({
      mensaje: 'Login correcto',
      token
    });
  }

  return res.status(401).json({
    mensaje: 'Credenciales inválidas'
  });

});

// Obtener producto por id
app.get('/productos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const producto = arrproductos.find(
    p => p.id === id
  );

  if (!producto) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }

  res.json({
    mensaje: 'Producto solicitado',
    producto
  });

});

// Crear producto
app.post('/api/productos/new', (req, res) => {

  const newproducto = req.body;

  arrproductos.push(newproducto);

  res.status(201).json({
    mensaje: 'Producto creado',
    producto: newproducto
  });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

***/