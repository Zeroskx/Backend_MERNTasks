const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// --- Endpoint a consultar api/tareas  ---

// Crear Tarea - POST
router.post('/', 
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego al controlador para que cree la tarea
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty() // Si la autenticacion es exitosa, validamos que el nombre de la tarea no este en vacio
    ],
    tareaController.crearTarea
);

// Obtener tareas por proyecto - GET
router.get('/', 
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego trae las tareas de sus proyectos
    tareaController.obtenerTarea
);


// Actualizar tareas por ID - PUT
router.put('/:id', 
    auth, // pasa primero por el middleware confirmando que sea un usuario autenticado y luego manda al controlador
    tareaController.actualizarTarea
);

// Eliminar una tarea - DELETE
router.delete('/:id',
    auth,
    tareaController.eliminarTarea);

module.exports = router;
