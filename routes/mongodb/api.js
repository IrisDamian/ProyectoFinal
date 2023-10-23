var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var User = require("./userSchema");
const Usuario = require("./userSchema");

mongoose
  .connect("mongodb://127.0.0.1:27017/sistema_gestion_usuarios", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion exitosa mongo");
  })

  .catch((error) => {
    console.log("Error al conectar a la base de datos", error);
  });

router.get("/Hola", (req, res) => {
  res.json({ hola: "probando" });
});

router.post('/crear', async (req, res) => {
    try {
      const nuevoUsuario = new Usuario(req.body);
      const usuarioguardado = await nuevoUsuario.save();
      res.status(201).json(usuarioguardado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear usuario' });
    }
  });

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/routes/mongodb/registro.html');
  });

router.get('/login', (req, res) => {
    res.sendFile(__dirname + '/routes/mongodb/login.html');
  });

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find(); // Usamos el método .find() para obtener todos los documentos de la colección

    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "No se pudo obtener la data de la colección de usuarios." });
  }
});


module.exports = router;