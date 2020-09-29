/*
Ruta: /api/usuarios
*/

//importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, desactivarUsuario, getAllUsuarios } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');
//Fin importaciones

const router = Router();

//get all users
router.get('/', validarJwt, getUsuarios);
router.get('/all/', getAllUsuarios);

//save user
//implementacion de middleware para vereficar campos requridos
//npm i express-validator
router.post('/', [
    //definicion de middleware
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La clave: mínimo 8 caracteres').isLength(8),
    check('email', 'El correo es requerido').isEmail(),
    validarCampos
], crearUsuario);

//put user
router.put('/:id', validarJwt, [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

//dellete user
router.delete('/:id', validarJwt, borrarUsuario);

//dellete user
router.delete('/desactivar/:id', desactivarUsuario);


module.exports = router;