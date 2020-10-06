/*
Path: '/api/login'
*/
//importacopnes
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

//fin importacopnes

const router = Router();

router.post('/', [

        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria').not().isEmpty(),
        validarCampos

    ],
    login
);

router.post('/google', [

        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos

    ],
    googleSingIn
);
module.exports = router;