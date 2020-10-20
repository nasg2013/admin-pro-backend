//importaciones
const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');
//Fin de importaciones

//obtiene todos los usuarios activos
const getBusqueda = async(req, res = response) => {

        const palabraQuery = req.query.palabra || "";
        const palabraParams = req.params.palabra || "";
        let busqueda;


        if (palabraParams === "") {
            busqueda = palabraQuery;
        }

        if (palabraQuery === "") {
            busqueda = palabraParams;
        }

        const regEx = RegExp(busqueda, 'i');

        // const usuarios = await Usuario.find({ nombre: regEx });
        // const hospitales = await Hospital.find({ nombre: regEx });
        // const medicos = await Medico.find({ nombre: regEx });

        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({ nombre: regEx }),
            Hospital.find({ nombre: regEx }),
            Medico.find({ nombre: regEx })
        ]);



        res.json({
            ok: true,
            usuarios: usuarios,
            hospitales: hospitales,
            medicos: medicos
        });

    } //fin obtener 

//obtiene todos los usuarios activos
const getDocumentosColeccion = async(req, res = response) => {

        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        const regEx = RegExp(busqueda, 'i');
        const desde = Number(req.query.desde) || 0;
        var total = 0;

        let data = [];
        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regEx })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regEx })
                    .populate('usuario', 'nombre img');
                break;
            case 'usuarios':
                console.log(desde);
                if (desde === -1) {
                    data = await Usuario.find({ nombre: regEx });
                } else {
                    [data, total] = await Promise.all([
                        Usuario
                        .find({ nombre: regEx }, 'nombre email role google img')
                        .skip(desde)
                        .limit(5),
                        Usuario.countDocuments()
                    ]);
                }
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Colección tiene que ser medicos,usuarios u hospitales'
                });
        }
        res.json({
            ok: true,
            resultado: data,
            total
        });

    } //fin obtener 


module.exports = {
    getBusqueda,
    getDocumentosColeccion
}