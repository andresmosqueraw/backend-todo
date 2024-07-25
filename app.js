const express = require('express');
const cors = require('cors'); // Requiere el paquete CORS
const routes = require('./router');

const app = express();

// Activa CORS para todas las solicitudes
app.use(cors());

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Configurar las rutas
app.use('/', routes);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
