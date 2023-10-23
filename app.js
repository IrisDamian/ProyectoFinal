const express = require('express');
const port = 3000
const app = express()   
const api = require('./routes/mongodb/api')
const mysqlConnection = require('./routes/mysql/mysql');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwt = require('jsonwebtoken');

app.use(express.json());
// Configura la estrategia JWT
const JWT_SECRET = 'clave'; 
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  // Verifica y carga los datos del usuario si el token JWT es válido
  return done(null, jwtPayload);
}));

// Ruta protegida con autenticación JWT
app.get('/perfil', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Ruta protegida exitosa' });
});

app.get('/generar-token', (req, res) => {
  // Información que deseas incluir en el token (por ejemplo, el ID del usuario)
  const userId = 1;

  // Clave secreta para firmar el token (debe ser secreta en un entorno real)
  const secretKey = 'clave';

  // Genera el token JWT
  const token = jwt.sign({ id: userId }, secretKey);

  // Envía el token como respuesta
  res.json({ token });
});

app.listen (port, function(){
    console.log ('Servidor en ejecución en el puerto ' + port);
})

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use ("/users",api);

app.get('/registro.html', (req, res) => {
  res.sendFile(__dirname + '/routes/mongodb/registro.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/routes/mongodb/registro.html');
});

app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/routes/mongodb/login.html');
});

app.get('/perfil.html', (req, res) => {
  res.sendFile(__dirname + '/routes/mongodb/perfil.html'); 
});

app.get('/confirmacion.html', (req, res) => {
  res.sendFile(__dirname + '/routes/mongodb/confirmacion.html');
});


// Ruta para manejar el inicio de sesión (POST)
app.post('/users/login', (req, res) => {
  
  
  const email = req.body.email; // Obtener el correo electrónico del formulario
  const password = req.body.password; // Obtener la contraseña del formulario
  res.redirect('/perfil.html');
});

const mysql = require('mysql2');
const multer = require('multer'); // Para manejar la carga de archivos

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345mag',
  database: 'sistema_gestion_usuarios', // Reemplaza con el nombre de tu base de datos
});

// Conéctate a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

// Configura Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Reemplaza con la ruta donde deseas guardar las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Ruta para guardar el perfil
app.post('/guardar-perfil', upload.single('foto-perfil'), (req, res) => {
  const { nombre, fecha_nacimiento, direccion, edad } = req.body;
  const fotoPerfil = req.file ? req.file.filename : null;

  // Define la consulta SQL para insertar los datos del perfil en la base de datos
  const sql = 'INSERT INTO perfil (nombre, fecha_nacimiento, direccion, edad, foto_perfil) VALUES (?, ?, ?, ?, ?)';

  // Ejecuta la consulta SQL
  db.query(sql, [nombre, fecha_nacimiento, direccion, edad, fotoPerfil], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      // Maneja el error de alguna manera
    } else {
      console.log('Perfil insertado con éxito en la base de datos');
      // Redirige al usuario a una página de confirmación o a donde desees
      res.redirect('/confirmacion.html');
    }
  });
});




