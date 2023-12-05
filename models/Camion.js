//Esquema para colocar los objetos recibidos a la base de datos
const mongoose = require('mongoose');

const CamionSchema = mongoose.Schema({
    destino: {
        type: String,
        required: true
    },
    camion: {
        type: String,
        required: true
    },
    salida: {
        type: String,
        required: true
    },
    boletos: {
        type: String,
        required: true
    }
});
//Exportar modelos de esquemas
module.exports = mongoose.model('Camion',CamionSchema);