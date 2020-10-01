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
        res.json({
            ok: true,
            msg: 'actualizarMedicos'
        });
    } //fin actualizarMedicos

const borrarMedico = async(req, res = response) => {
        res.json({
            ok: true,
            msg: 'borrarMedicos'
        });
    } //fin borrarMedicos

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}