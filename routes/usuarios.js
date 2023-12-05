//rutas para usuario

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// api/usuarios
router.post('/', usuarioController.crearUsuario);
router.post('/auth',usuarioController.autentificarUsuario);
router.get('/',usuarioController.consultarUsuario);
router.put('/:id',usuarioController.actualizarUsuario);
router.delete('/:id',usuarioController.borrarUsuario);
module.exports = router;