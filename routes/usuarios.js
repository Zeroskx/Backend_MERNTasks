// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator');

// Crea un usuario conocido como Middleware
// Esto respondera cuando se haga un request a api/usuarios 

// Sin embargo, crear una funcion por cada endpoint haria un codigo dificil de mantener, por eso ocuparemos controladores.
/*
router.post('/', () => { // Se deja en la principal porque ya esta siendo llamada desde el index. Que hace si se consulta con POST
    console.log('Creando usuario...')
});
*/

//api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres y maximo de 18').isLength({ min:6, max:18 }),    
    ],
    usuarioController.crearUsuario
);


module.exports = router;

