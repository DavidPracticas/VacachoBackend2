const { lutimes } = require("fs");
const Usuario = require("../models/Usuario");
const nodeEmailer = require("nodemailer");
//Controladores para hacer peticiones de usuarios
//medodo para crear usuario
exports.crearUsuario = async (req,res) => {

    try{
        let usuario;
        //crear usuario [POST]
        usuario = new Usuario(req.body); //se esta agarrando el modelo Usuario en /models/usuario
//Constantes para enviar correo//-------------------------------------------------------
        const transporter = nodeEmailer.createTransport({
            service: 'gmail',
            port: 4000,
            auth:{
                user: 'davidavilacervantes01@gmail.com', //Correo desde donde se envia
                pass: 'vlgd klpn axog ivhd' //Contraseña del correo con confirmacion de 2 pasos y contraseña de aplicaciones
            }
        });

        const mailOpciones = {
            from: 'Vacacho',
            to: usuario.email, //Correo al que se envia ("david2000nauch@gmail.com")
            subject: 'CONFIRMACION DE CUENTA EN VACACHO',
            text: 'Correo de confirmacion para ' + `${usuario.nombre} ${usuario.apellido}`

        }

        transporter.sendMail(mailOpciones,function(error,info){
            if (error){
                console.log('Fallo al enviar correo');
                console.log(error);
            }else{
                console.log('Se envio correo - ' + info.response);
            }
        });
//--------------------------------------------------------------------------------------
        await usuario.save(usuario);
        res.send(usuario); //envia los datos
        //console.log(usuario.email);

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en crearUsuario controller')
    }
    //console.log("Mensaje desde el controlador crearUsuario")
}
//metodo para obtener usuario [GET]
exports.consultarUsuario = async(req,res) => {
    try{
        const usuarios = await Usuario.find();
        //console.log("Se uso consultarUsuario del controlador con exito")
        res.json(usuarios)
    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en consultarUsuario controller')
    }
}

//metodo para autentificar Usuario [POST]
exports.autentificarUsuario = async (req,res) => {
    try{
        const { email, password } = req.body;
        
        // Buscar al usuario por email y password
        const usuario = await Usuario.findOne({ email, password});

        if (!usuario) {
            console.log("No existe el usuario");
            return res.status(404).json({ msg: 'No existe el usuario' });
        }else{
            res.send({msg:'Ingreso correcto', permiso: usuario.permisoAdm})
            console.log("Si existe el usuario" + usuario.permisoAdm);
        }
    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en autentificarUsuario controller')
    }

}
//metodo para actualizar usuario [PUT]
exports.actualizarUsuario = async(req,res) => {
    try{
        const {nombre, apellido, password } = req.body;
        let usuario = await Usuario.findById(req.params.id); // consulta base de datos
        
        if (!usuario){
            res.status(404).json({msg: 'no existe el usuario'})
        }

        usuario.nombre = nombre;
        usuario.apellido = apellido ;
        usuario.password = password;

        usuario = await Usuario.findOneAndUpdate( {_id: req.params.id}, usuario, {new:true} ) //actualizar en base de datos
        res.json(usuario)
    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en actualizarUsuario controller')
    }
}

//metodo para borrar usuario [DELETE]
exports.borrarUsuario = async(req,res) => {
    try{
        let usuario = await Usuario.findById(req.params.id); // consulta base de datos

        if (!usuario){
            res.status(404).json({msg: 'no existe el usuario'})
        }

        usuario = await Usuario.findOneAndRemove( {_id: req.params.id} ) //borrar en base de datos
        res.json({msg: 'Usuario borrado'})

    }catch (error){
        console.log(error)
        res.status(500).send('Hubo un error en actualizarUsuario controller')
    }
}





