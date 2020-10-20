/*
Ruta: /api/busqueda
*/

//importaciones
const { Router } = require('express');
const { getBusqueda, getDocumentosColeccion } = require('../controllers/busqueda.controller');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');
//Fin importaciones

const router = Router();

//get query /busqueda?palabra=palabra
//busca considencias en toda la base de datos
router.get('/', validarJwt, getBusqueda);

//get params /busqueda/coleccion/usuarios/palabra
router.get('/:palabra', validarJwt, getBusqueda);

//get params
router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentosColeccion);

module.exports = router;