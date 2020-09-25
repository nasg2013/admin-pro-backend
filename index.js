const express = require('express');
require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crea un servidor express
const app = express();

//cors
app.use(cors());

//Base de datos
dbConnection();

//User: nestor
//pass: 8319H6eCvmu7jK9A
//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msj: 'Hola mundo'
    });

});



//seleccionar puesto donde quiere correr el backend
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});