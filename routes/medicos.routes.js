/*
Ruta: /api/medicos
*/

//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos.middleware');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controller');

const { validarJwt } = require('../middlewares/validar-jwt.middleware');

//Fin importaciones

const router = Router();

//get all 
router.get('/', getMedicos);

//save 
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
    check('hospital', 'El hospital ID no es válido').isMongoId(),
    validarCampos
], crearMedico);

//put 
router.put('/:id', [],
    actualizarMedico
);

//dellete 
router.delete('/:id', borrarMedico);

module.exports = router;