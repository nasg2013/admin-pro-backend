//importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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


const googleSingIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //si no existe
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //si existe
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardar en BD
        await usuario.save();

        //Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }


}; //Fin login

const renewToken = async(req, res = response) => {

    const usuarioId = req.usuarioId;
    //Generar token
    const token = await generarJWT(usuarioId);
    //Usuario
    const usuarioDB = await Usuario.findById(usuarioId);

    res.json({
        ok: true,
        token,
        usuarioDB
    });
};

module.exports = {
    login,
    googleSingIn,
    renewToken
}