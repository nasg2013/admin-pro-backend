//importaciones
const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarFile } = require('../helpers/actualizar-file');


//Fin de importaciones

const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Tipo tiene que ser medicos,usuarios u hospitales'
        });
    }

    //validacion de archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Error al cargar archivo'
        });
    }

    //Procesar la imagen
    //req.files.imagen -> nombre que se coloco en el header
    //files contiene la imagen gracias al middleware
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extencion
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];

    if (!extencionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Error, extensión no válida'
        });
    }

    //generar nombre del archivo
    //se genera un nombre unico
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    //mover la imagen al path
    file.mv(path, (err) => {

        //Actualizar base de datos
        actualizarFile(tipo, id, nombreArchivo);

        if (err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al guardar el archivo'
            });
        }

        res.json({
            ok: true,
            msg: 'Archivo subido con exito',
            nombreArchivo
        });
    });
};

const getImagen = async(req, res = response) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ img }`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        //si imagen no existe
        //imagen por defecto
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }



};

module.exports = {
    fileUpload,
    getImagen
};


// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));