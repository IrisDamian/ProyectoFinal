const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '12345mag', 
  database: 'sistema_gestion_usuarios' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a mysql');
});

module.exports = connection; // Exporta la conexión para usarla en otros archivos.
