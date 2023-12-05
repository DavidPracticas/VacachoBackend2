//Esquema para colocar los objetos recibidos a la base de datos
const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permisoAdm:{
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});
//Exportar modelos de esquemas
module.exports = mongoose.model('Usuario',UsuarioSchema);