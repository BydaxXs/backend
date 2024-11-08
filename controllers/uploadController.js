const upload = require('../utils/multerConfig');

function uploadFile(req, res){
    upload(req, res, function (error) {
        try {
            res.status(200).send({msg : 'Archivo añadido correctamnte'});
        } catch (error) {
            res.status(504).send({msg : 'Error al subir el archivo'});
        }
    });
}

module.exports = {
    uploadFile
}