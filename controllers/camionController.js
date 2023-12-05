//Controladores para hacer peticiones de camiones
const Camion = require("../models/Camion");

//medodo para crear camion
exports.crearCamion = async (req,res) => {

    try{
        let camion;
        //crear camion [POST]
        camion = new Camion(req.body); //se esta agarrando el modelo Camion en /models/camion

        await camion.save(camion);
        res.send(camion); //envia los datos

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en crearCamion controller')
    }
    //console.log("Mensaje desde el controlador crearCamion")
}
//metodo para obtener camion [GET]
exports.consultarCamion = async(req,res) => {
    try{
        const camiones = await Camion.find();
        //console.log("Se uso consultarCamion del controlador con exito")
        res.json(camiones)
    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en consultarCamion controller')
    }
}
