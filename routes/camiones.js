const express = require('express');
const router = express.Router();
const camionController = require('../controllers/camionController');

//rutas url para camiones
// api/camiones
router.post('/', camionController.crearCamion);
router.get('/',camionController.consultarCamion);
//router.put('/:id',camionController.actualizarCamion);
//router.delete('/:id',camionController.borrarCamion);

module.exports = router;