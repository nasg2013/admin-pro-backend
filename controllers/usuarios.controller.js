//importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario.model');
//Fin de importaciones

//obtiene todos los usuarios activos
const getUsuarios = async(req, res = response) => {

        const desde = Number(req.query.desde) || 0;

        const [usuarios, total] = await Promise.all([
            Usuario
            .find({ activo: true }, 'nombre email role google img')
            .skip(desde)
            .limit(5),
            Usuario.countDocuments()
        ]);

        res.json({
            ok: true,
            usuarios,
            total
        });

    } //fin obtener usuarios

//obtiene todos los usuarios
const getAllUsuarios = async(req, res = response) => {
        const usuarios = await Usuario.find({}, 'nombre email role google activo');
        res.json({
            ok: true,
            usuarios
        });

    } //fin obtener usuarios

//Crea un usuario
const crearUsuario = async(req, res = response) => {

        const { email, password } = req.body;

        //validar si email existe
        try {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }

            const usuario = new Usuario(req.body);

            // Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            // Guardar usuario
            await usuario.save();

            //obtener token
            const token = await generarJWT(usuario.id);

            res.json({
                ok: true,
                usuario,
                token
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }

    } //fin de crear usuario

const actualizarUsuario = async(req, res = response) => {
        const usuarioId = req.params.id;
        try {
            const usuarioDB = await Usuario.findById(usuarioId);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El usuario ID no existe'
                });
            }
            //Actualizacines a BD
            const { password, google, email, ...campos } = req.body;
            if (usuarioDB.email !== email) {
                //Verifica que el correo no exista
                const existEmail = await Usuario.findOne({ email });
                if (existEmail) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'El correo ya está registrado'
                    });
                }
            }

            if (!usuarioDB.google) {
                campos.email = email;
            } else if (usuarioDB.email !== email) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario de google, no puede cambiar el correo'
                });
            }

            const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, campos, { new: true });
            res.json({
                ok: true,
                usuario: usuarioActualizado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }
    } //fin obtener usuarios

//borrarusuario
const borrarUsuario = async(req, res = response) => {
        const usuarioId = req.params.id;
        try {
            const usuarioDB = await Usuario.findById(usuarioId);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El usuario ID no existe'
                });
            }
            //elimina usuario de la base de datos
            await Usuario.findByIdAndDelete(usuarioId);
            res.json({
                ok: true,
                msg: 'Usuario borrado'
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }
    } // fin borrar usuario

//desactivarusuario
const desactivarUsuario = async(req, res = responsees) => {

        const usuarioId = req.params.id;

        try {

            const usuarioDB = await Usuario.findById(usuarioId);

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El usuario ID no existe'
                });
            }

            //desactivo usuario

            const campos = req.body;
            campos.activo = false;
            const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, campos, { new: true });

            res.json({
                ok: true,
                msg: 'Usuario desactivado'
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }

    } // fin desactivar usuario

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    desactivarUsuario,
    getAllUsuarios
}