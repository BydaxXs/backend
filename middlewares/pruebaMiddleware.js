const jwt = require('../utils/jws');
const log4 = require('log4js');
const logger = log4.getLogger('authMiddleware');
logger.level = "all";
const viewsModel = require('../models/viewsModel');

async function getViewsPerUser(req, res, next){
    try {
        const { data, view } = req.body; /* SE RECIBEN LOS DATOS ENCRIPTADOS CON LAS VISTAS QUE EL USUARIO PUEDE VER */
        const token = req.headers.authorization.slice(7, -1); /* RECIBIOS EL TOKEN */
        const { userId } = jwt.decodeToken(token); /* EXTRAEMOS EL ID DEL USUARIO */
        const arrDepto = []; /* SE CREA UN ARRAY VACIO PARA EL DEPARTAMENTO */
        const arrSub = []; /* SE CREA UN ARRAI VACIO PARA EL SUB-DEPARTAMENTO */
        const arrProcess = []; /* SE CREA ARRAY VACIO PARA LOS PROCESOS */
        const arrAction = []; /* SE CREA UN ARRAY VACIO PARA LAS ACCIONES */
        const links = []; /* SE CREA UN ARRAY VACIO PARA CREAR EL JSON DEL MENU */
        const dataUser = await userModel.findById(userId); /* TRAEMOS LOS DATOS DEL USUARIO */
        if (!dataUser) {
            throw new Error("Usuario sin Autorización de Ingreso"); /* SIN NO EXISTE MANDAMOS LA EXCEPCION */
        }
        const vistas = dataUser.vistas; /* UTILIZAMOS LAS VISTAS DEL USUARIO */
        for (let ind = 0; ind < Object.keys(vistas).length; ind++) { /* RECORREMOS LOS IDS DE LAS VISTAS DEL USUARIO */
            let vista = await viewsModel.findById(vistas[ind]); /* CARGAMOS EL PRIMER ID PARA TRAER LA VISTA */
            let sub = await subModel.findOne({ "_id": vista.view_sub }); /* CON EL ID DEL SUB DEPARTAMENTO GUARDADO EN LA VISTA */
            let subExist = arrSub.some((subItem) => subItem.key === vista.view_sub.toString()); /* NOS TRAEMOS LOS SUB-DEPTOS DE LA VISTA, YA QUE PUEDE HABER 1 O MAS */
            if (!subExist) {
                arrSub.push({ "key": vista.view_sub.toString(), "nombre": sub.depto_name, "link": sub.depto_name, "depto": sub.depto.toString(), "children": [] }); /* SI NO EXISTEN SUB-DEPTOS, DEJAMOS EL ARRAY VACIO */
            }
            let accion = await actionModel.findById(vista.view_accion); /* SI EXISTEN SUB-DEPTOS, ENTONCES VAMOS A BUSCAR LAS ACCIONES DE ESA VISTA*/
            let actionExist = arrAction.some((itemAction) => itemAction.key === accion._id.toString()); /* NOS TRAEOS LAS ACCIONES */
            if (!actionExist) { /* SI NO EXISTEN ACCIONES */
                arrAction.push({ "key": accion._id.toString(), "nombre": accion.accion, "proceso": vista.view_process.toString(), "link": vista.view_front }); /* DEJAMOS EL ARRFAY VACION */
            }
            let process = await procesoModel.findById(vista.view_process); /* AL EXISTIR ACCIONES, VAMOS A BUSCAR A QUE PROCESOS CORRESPONDEN */
            let processExist = arrProcess.some((itemProcess) => itemProcess.key === process._id.toString()); /* NOS TRAEMOS LOS PROCESOS */
            if (!processExist) { /* PROCESO NO EXISTE */
                arrProcess.push({ "key": process._id.toString(), "nombre": process.proceso, "link": process.proceso, "sub": process.sub_depto.toString(), "children": [] }); /* DEJAMOS EL ARRAY VACIO */
            }
            let depto = await deptoModel.findById(sub.depto); /* AHORA BUSCAMOS EL DEPARTAMENTO */
            let deptoExist = arrDepto.some((deptoItem) => deptoItem.key === sub.depto.toString()); /* NOS TRAEMOS LOS DEPARTAMENTOS */
            if (!deptoExist) { /* NO EXISTE EL DEPARTAMENTO */
                arrDepto.push({ "key": depto._id.toString(), "nombre": depto.depto_name, "children": [] }); /* DEJAMOS EL ARRAY VACION */
            }
        }
        arrDepto.sort((a,b) => {  /* ORDENAMOS EL ARRAY DE DEPTOS */
            if (a.key > b.key) {
                return 1;
            }
            if (a.key < b.key) {
                return -1;
            }
            return 0;
        });
        arrSub.sort((a,b) => { /* ORDENAMOS EL ARRAY DE SUB-DEPTOS */
            if (a.depto > b.depto) {
                return 1;
            }
            if (a.depto < b.depto) {
                return -1;
            }
            return 0;
        });
        arrAction.sort((a,b) => { /* ORDENAMOS EL ARRAY DE ACCIONES */
            if (a.proceso > b.proceso) {
                return 1;
            }
            if (a.proceso < b.proceso) {
                return -1;
            }
            return 0;
        });
        arrProcess.sort((a, b) => { /* ORDENAMOS EL ARRAY DE PROCESOS */
            if (a.sub > b.sub) {
                return 1;
            }
            if (a.sub < b.sub) {
                return -1;
            }
            return 0;
        });
        for (let indProcess = 0; indProcess < arrProcess.length; indProcess++) { /* VINCULAMOS LA ACCION CON EL PROCESO */
            for (let indAction = 0; indAction < arrAction.length; indAction++) {
                if (arrProcess[indProcess].key === arrAction[indAction].proceso) { /* SI ACCION CORRESPONDE Y NO EXISTE EN PROCESO */
                    arrProcess[indProcess].children.push(arrAction[indAction]); /* AGREGAMOS LA ACCION AL PROCESO */
                }
            }
        }
        for (let indSub = 0; indSub < arrSub.length; indSub++) { /* VINCULAMOS EL PROCESO AL SUB-DEPTO */
            for (let indProcess = 0; indProcess < arrProcess.length; indProcess++) {
                if (arrSub[indSub].key === arrProcess[indProcess].sub) { /* SI PROCESO CORRESPONDE Y NO EXISTE DENTRO DEL SUB-DEPTO */
                    arrSub[indSub].children.push(arrProcess[indProcess]); /* AGREGAMOS EL PROCESO AL SUB-DEPTO */
                }
            }
        }
        for (let indDepto = 0; indDepto < arrDepto.length; indDepto++) { /* VINCULAMOS EL SUB-DEPTO AL DEPTO */
            for (let indSub = 0; indSub < arrSub.length; indSub++) {
                if (arrDepto[indDepto].key === arrSub[indSub].depto) { /* SI SUB-DEPTO CORRESPONDE AL DEPTO Y NO EXISTE DENTRO */
                    arrDepto[indDepto].children.push(arrSub[indSub]); /* LO AGREGAMOS */
                } else {
                    arrDepto[indDepto].children.push([]); /* SI EL SUB-DEPTO NO EXISTE, DEJAMOS VACIO EL ARRAY */
                }
            }
        }
        const usuWork = await workModel.findById(dataUser.usu_trabajador);
        links.push({"menu":arrDepto}); /* AGREGAMOS EL ARRAY DE MENU QUE VAMOS A DEVOLVER */
        links.push({"nombre": usuWork.nombre_worker}); /* AGREGAMOS EL NOMBRE DEL USUARIO */
        req.body.menu = links;
        next()
        
    }
    catch(error){
        logger.error(error);
        return res.status(504).send({msg : "Error al cargar las vistas"});
    }
}