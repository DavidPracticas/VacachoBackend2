const express = require ('express');
const conectarDB = require('./config/db');
const cors = require ('cors');
const fs = require('fs'); // Paquete para leer archivos
const https = require('https'); // Paquete para habilitar instancias https
//crear servidor

const app = express();

//Conectar a db
conectarDB();
app.use(cors());
//Habilitar los mensajes json
app.use(express.json());
//Definir rutas con el front
app.use('/api/usuarios', require('./routes/usuarios')); //ruta para api de usuarios
app.use('/api/camiones', require('./routes/camiones')); //ruta para api de camiones


//Configurar https
https.createServer({
    cert : fs.readFileSync('vacacho.cer'),
    key : fs.readFileSync('vacacho.key')
},
app).listen(4000, () =>{ //Puerto en que esta abierto el server
    console.log("El servidor esta corriendo en el puerto 4000")
});

/*const dia = 10;
const mes= "12";
const year= "2023"
const hora = "08:20"

const salida = dia + "/" + mes + "/" + year + " " + hora;
console.log(salida);

//Puerto en que esta abierto el server
/*app.listen(4000, () =>{
    console.log("El servidor esta corriendo en el puerto 4000")
});*/
