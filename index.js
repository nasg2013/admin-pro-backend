const express = require('express');
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crea un servidor express
const app = express();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//User: nestor
//pass: 8319H6eCvmu7jK9A
//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));

//seleccionar puesto donde quiere correr el backend
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});