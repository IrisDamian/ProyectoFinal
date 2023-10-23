// Importa Mongoose
const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'], // Define los roles permitidos
    default: 'usuario' // Valor por defecto
  },
  password: {
    type: String,
    required: true,
  },
});

// Crea el modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

// Exporta el modelo para su uso en otras partes de la aplicación
module.exports = User;