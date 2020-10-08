//importaciones
const { response } = require('express');

const Medico = require('../models/medico.model');

//Fin de importaciones


const getMedicos = async(req, res = response) => {

        const medicos = await Medico.find()
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');


        res.json({
            ok: true,
            medicos
        });
    } //fin getMedicos

const crearMedico = async(req, res = response) => {

        const usuarioId = req.usuarioId;
        const medico = new Medico({
            usuario: usuarioId,
            ...req.body
        });

        try {

            const medicoDB = await medico.save();

            res.json({
                ok: true,
                medico: medicoDB
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });
        }
    } //fin crearMedicos

const actualizarMedico = async(req, res = response) => {

        const medicoId = req.params.id;
        const usuarioId = req.usuarioId;

        try {

            const medicoDB = await Medico.findById(medicoId);

            if (!medicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'El medico ID no existe'
                });
            }

            //Actualizar DB
            const cambiosMedico = {
                ...req.body,
                usuario: usuarioId
            };

            const medicoActualizado = await Medico.findByIdAndUpdate(
                medicoId,
                cambiosMedico, { new: true }
            );


            res.json({
                ok: true,
                medico: medicoActualizado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });

        }



    } //fin actualizarMedicos

const borrarMedico = async(req, res = response) => {

        const medicoId = req.params.id;

        try {

            const medico = await Medico.findById(medicoId);

            if (!medico) {
                res.status(404).json({
                    ok: false,
                    msg: 'El medico ID no existe'
                });
            }

            //elimina medico de la base de datos
            await Medico.findByIdAndDelete(medicoId);

            res.json({
                ok: true,
                msg: 'Medico Borrado',
                medico
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado... revisar logs'
            });

        }

    } //fin borrarMedicos

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}