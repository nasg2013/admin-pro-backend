const jwt = require('jsonwebtoken');

const generarJWT = (usuarioId) => {

    return new Promise((resolve, reject) => {

        //Se puede guardar lo que sea, por lo general infirmacion no sencible
        const payload = {
            usuarioId
        };

        //jwt.sign( payload, palabrasecreta(firma), { expiracion})
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.error(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
}