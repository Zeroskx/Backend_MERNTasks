const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// --- Endpoint a consultar api/proyectos  ---

// Es necesario que el usuario este autenticado

// Crea proyectos
router.post('/', 
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego al controlador para que cree el proyecto
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty() // Si la autenticacion es exitosa, validamos que el proyecto no este en vacio
    ],
    proyectoController.crearProyecto
);

// Obtener todos los proyectos
router.get('/', 
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego al controlador para que vea los proyecto
    proyectoController.obtenerProyecto
);

// Actualizar proyectos via ID
router.put('/:id', //Vamos a recibir un ID para actualizarlo
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego al controlador para que actualice el proyecto
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty() // Si la autenticacion es exitosa, validamos que el proyecto no este en vacio
    ],
    proyectoController.actualizarProyecto
);

// Eliminar proyectos via ID
router.delete('/:id', //Vamos a recibir un ID para actualizarlo
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego al controlador para que actualice el proyecto
    proyectoController.eliminarProyecto
);


module.exports = router;