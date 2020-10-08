/*
Ruta: /api/hospitales
*/

//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.middleware');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales.controller');

const { validarJwt } = require('../middlewares/validar-jwt.middleware');

//Fin importaciones

const router = Router();

//get all Hospitals
router.get('/', getHospitales);

//save user
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], crearHospital);

//put user
router.put('/:id', [
        validarJwt,
        check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

//dellete
router.delete('/:id', validarJwt, borrarHospital);

module.exports = router;