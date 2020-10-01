/*
Ruta: /api/upload
*/

//importaciones
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, getImagen } = require('../controllers/uploads.controller');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');
//Fin importaciones

const router = Router();

//middleware express-fileupload
router.use(expressFileUpload());

//get params
router.get('/:tipo/:img', validarJwt, getImagen);

//put params
router.put('/:tipo/:id', validarJwt, fileUpload);

module.exports = router;