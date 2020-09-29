//importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

//Fin de importaciones

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {


        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {

            res.status(404).json({
                ok: false,
                msg: 'Error inesperado... revisar logs email'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            res.status(404).json({
                ok: false,
                msg: 'Error inesperado... revisar logs contraseña'
            });
        }

        //Generar token
        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}; //Fin login

module.exports = {
    login
}