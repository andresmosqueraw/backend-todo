const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT, 
  database: process.env.DB_DATABASE,
  });

  console.log({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

  
// Conexión a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos: ', err);
      return;
    } 
    console.log('Conexión a la base de datos MySQL establecida');
  });
  
module.exports = connection;
