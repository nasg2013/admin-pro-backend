/*
Ruta: /api/busqueda
*/

//importaciones
const { Router } = require('express');
const { getBusqueda, getDocumentosColeccion } = require('../controllers/busqueda.controller');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');
//Fin importaciones

const router = Router();

//get query ?palabra=palabra
router.get('/', validarJwt, getBusqueda);

//get params /params
router.get('/:palabra', validarJwt, getBusqueda);

//get params
router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentosColeccion);

module.exports = router;