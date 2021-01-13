//importaciones
const { response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
//fin importaciones

const validarJwt = (req, res = response, next) => {

    //leer token 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            errors: 'No token'
        });
    }

    try {

        const { usuarioId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.usuarioId = usuarioId;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            errors: 'Token no válido'
        });
    }


};

const validarAdminRole = async(req, res = response, next) => {

    const usuarioId = req.usuarioId;

    try {

        const usuarioDB = await Usuario.findById(usuarioId);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: 'Contacte al Administrador'
        });
    }

}

const validarAdminRoleByOwner = async(req, res = response, next) => {

    const usuarioId = req.usuarioId;
    const usuarioIdParam = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(usuarioId);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || usuarioId === usuarioIdParam) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos'
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            errors: 'Contacte al Administrador'
        });
    }

}

module.exports = {
    validarJwt,
    validarAdminRole,
    validarAdminRoleByOwner
};