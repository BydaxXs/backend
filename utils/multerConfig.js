const multer = require('multer');
const log4 = require('log4js');
const logger = log4.getLogger('uploadController.js');
logger.level = 'all';

//CONFIGURACION DE MULTER
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        const uploadFolder = req.requestID;
        cb(null, `uploads/${uploadFolder}`);
    },
    filename: function(req, file, cb) {
        const date = new Date().toISOString().split('T')[0];
        const hour = new Date();
        if (file.mimetype !== 'application/pdf') {
            logger.error('El archivo debe ser formato PDF');
        } else {
            cb(null, `${date}-${hour.getTime()}-${file.originalname}`);
        }
        console.log(file); 
    }
});

const upload = multer({ 
    storage: storage 
}).single('myFile');

module.exports = upload;