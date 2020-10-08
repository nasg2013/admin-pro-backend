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

        const hospitalId = req.params.id;
        const usuarioId = req.usuarioId;

        try {

            const hospital = await Hospital.findById(hospitalId);

            if (!hospital) {
                res.status(404).json({
                    ok: false,
                    msg: 'El hospital ID no existe'
                });
            }

            //Actualizacines a BD
            const cambiosHospital = {
                ...req.body,
                usuario: usuarioId
            };

            const hospitalActualizado = await Hospital.findByIdAndUpdate(
                hospitalId,
                cambiosHospital, { new: true }
            );

            res.json({
                ok: true,
                hospital: hospitalActualizado
            });


        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }




    } //fin actualizarHospital

const borrarHospital = async(req, res = response) => {

        const hospitalId = req.params.id;

        try {

            const hospital = await Hospital.findById(hospitalId);

            if (!hospital) {
                res.status(404).json({
                    ok: false,
                    msg: 'El hospital ID no existe'
                });
            }

            //elimina hospital de la base de datos
            await Hospital.findByIdAndDelete(hospitalId);

            res.json({
                ok: true,
                msg: 'Hospital Borrado'
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });

        }




    } //fin borrarHospital

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}