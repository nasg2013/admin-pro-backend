//importaciones
const fs = require('fs');

const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');

//Fin de importaciones

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        //borra path viejo
        fs.unlinkSync(path);
    }

};

const actualizarFile = async(tipo, id, nombreArchivo) => {


    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                const path = `./uploads/medicos/${ nombreArchivo }`;
                borrarImagen(path);
                console.log('no se encontro médico por id');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                const path = `./uploads/hospitales/${ nombreArchivo }`;
                borrarImagen(path);
                console.log('no se encontro hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                const path = `./uploads/usuarios/${ nombreArchivo }`;
                borrarImagen(path);
                console.log('no se encontro usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }


};

module.exports = {
    actualizarFile
};