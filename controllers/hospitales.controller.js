//importaciones
const { response } = require('express');

const Hospital = require('../models/hospital.model');

//Fin de importaciones


const getHospitales = async(req, res = response) => {

        const hospitales = await Hospital.find()
            .populate('usuario', 'nombre img');


        res.json({
            ok: true,
            hospitales
        });
    } //fin getHospital

const crearHospital = async(req, res = response) => {

        const usuarioId = req.usuarioId;
        const hospital = new Hospital({
            usuario: usuarioId,
            ...req.body
        });

        try {

            const hospitalDB = await hospital.save();

            res.json({
                ok: true,
                hospital: hospitalDB
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });

        }


    } //fin crearHospital

const actualizarHospital = async(req, res = response) => {
        res.json({
            ok: true,
            msg: 'actualizarHospital'
        });
    } //fin actualizarHospital

const borrarHospital = async(req, res = response) => {
        res.json({
            ok: true,
            msg: 'borrarHospital'
        });
    } //fin borrarHospital

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}