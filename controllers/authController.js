const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('../utils/jws');
const validator = require('../utils/validator');
const log4 = require('log4js');
const { trace } = require('../routes/viewRoutes');
const logger = log4.getLogger("authController.js");
logger.level = "all";

const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username){
            throw new Error("Username is required");
        }
        if(!password){
            throw new Error("Password is required");
        }
        if (validator.validateUserName(username) == false) {
            throw new Error("Usuario no valido");
        }
        let datosUsuario = await userModel.findOne({username:username});
        if (!datosUsuario) {
            throw new Error("Error en las credenciales");
        }
        let contraseña = await bcrypt.compare(password, datosUsuario.password);
        if (!contraseña) {
            throw new Error("Error en las credenciales");
        }
        if(!datosUsuario.active){
            throw new Error("Error no autorizado para ingresar")
        }
        const accToken = jwt.createAccessToken(datosUsuario);
        const rfrToken = jwt.createRefreshToken(datosUsuario);
        const dataToken = jwt.createEncriptedUserViews(datosUsuario);
        const nameUser = datosUsuario.firstname + " " + datosUsuario.lastname + " " + datosUsuario.secondSurname;
        
        res.status(200).send({
            msg : "Acceso Autorizado",
            access: accToken,
            refresh: rfrToken,
            dataUser : dataToken,
        });
        
    } catch (error) {
        logger.trace(error)
        res.status(506).send({msg: error.message});
    }
}
module.exports = {
    login
}