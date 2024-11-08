const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set("strictQuery",false);
const log4 = require('log4js');
const logger = log4.getLogger("index.js");
logger.level= "all"
const app = require('./app');

let PORT = undefined;
var uri = undefined;
let nodeenv = process.env.NODE_ENV;
switch (nodeenv) {
    case "development":
        PORT = 3030
        uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IPV4}:${process.env.DB_PORT}/dev_${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=admin`
        break;
    case "production":
        PORT = 3040 
        uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IPV4}:${process.env.DB_PORT}/prd_${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=admin`
        break;
    case "testing":
        PORT = 3050 
        uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_IPV4}:${process.env.DB_PORT}/tst_${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=admin`
        break;
}
(async () => {
    try {
        await mongoose.connect(uri);
        logger.info("OK CONEXION");
        await app.listen(PORT, () => {
            logger.debug(`Server Runing in port http://${process.env.IP_SERV}:${PORT}/${process.env.API_VER}`);
            logger.debug("DB Access is Success!!");
            logger.debug("You are running " + nodeenv);
        });
    } catch (error) {
        logger.error(`CODE : 501 | Message error : ${error}`);
    }
})();


