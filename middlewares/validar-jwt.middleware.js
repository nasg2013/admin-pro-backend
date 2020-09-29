//importaciones
const { response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
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

module.exports = {
    validarJwt
};