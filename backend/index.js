const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(requestIp.mw());

app.post('/verificar-cedula', (req, res) => {
  const { cedula } = req.body;

  if (!cedula) {
    return res.status(400).json({ error: 'Cédula es requerida' });
  }

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [cedula], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({ success: true, name: user.name });
    } else {
      res.json({ success: false, message: 'Cédula no encontrada' });
    }
  });
});

app.post('/guardar-registro', (req, res) => {
  const { cedula, opcion, lugar, latitud, longitud } = req.body;
  const ip = req.clientIp;


  if (!cedula || !opcion || !lugar || !latitud || !longitud) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }


  console.log('Datos recibidos en el backend:', {
    cedula,
    opcion,
    lugar,
    latitud,
    longitud,
    ip
  });

  const query = 'INSERT INTO loggs (cedula, shift, place, latitud, longitud, ip) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [cedula, opcion, lugar, latitud, longitud, ip], (err) => {
    if (err) {
      console.error('Error insertando datos:', err);
      return res.status(500).json({ success: false, message: 'Error guardando los datos' });
    }
    res.json({ success: true, message: 'Registro guardado exitosamente' });
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
