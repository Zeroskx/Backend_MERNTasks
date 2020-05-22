// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');



// Autenticador para iniciar sesion cuando crea la cuenta
//api/auth
router.post('/',
  /*  [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres y maximo de 18').isLength({ min:6, max:18 }),    // Se esta validando en react
    ],*/
    authController.autenticarUsuario
);

// Autenticador para iniciar sesion cuando ya tiene cuenta
router.get('/',
    auth,
    authController.usuarioAutenticado
)


module.exports = router;