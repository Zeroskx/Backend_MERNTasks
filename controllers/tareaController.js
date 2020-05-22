const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')


// Crea una nueva tarea a un proyecto
exports.crearTarea = async(req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Extraer el proyecto
         const { proyecto } = req.body;

        //Ubicar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Comprobar si existe el proyecto
        if(!existeProyecto) {
            return res.status(404).send({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el usuario autenticado es el dueño del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(404).send({msg: 'No autorizado'});
        }

        //Crear la Tarea
        const tarea = new Tarea(req.body);
        await tarea.save()
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };

}

// Obtiene las tareas de un proyecto
exports.obtenerTarea = async(req, res) => {

    try {

        // Extraer el proyecto
        const { proyecto } = req.query;
        //console.log(req.query)  Esto leera los campos pasados desde el front cuando comunica con el endpoint para obtener las tareas

        //Ubicar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Comprobar si existe el proyecto
        if(!existeProyecto) {
            return res.status(404).send({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el usuario autenticado es el dueño del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(404).send({msg: 'No autorizado'});
        }

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({creado: -1});

        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };

}

// Actualiza las tareas por ID
exports.actualizarTarea = async(req, res) => {

    try {

        // Extraer la tarea
        const { proyecto, nombre, estado } = req.body;

        //Ubicar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Comprobar si existe la tarea
        const existeTarea = await Tarea.findById(req.params.id);

        //Comprobar si existe la tarea
        if(!existeTarea) {
            return res.status(404).send({msg: 'No existe la tarea'});
        }

        //Revisar si el usuario autenticado es el dueño del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(404).send({msg: 'No autorizado'});
        }

        //Crear nuevo objeto con la nueva informacion
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        
        //Guardar la Tarea
        const tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new: true})
        //Respuesta
        res.json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };

}


//Elimina la tarea por ID

exports.eliminarTarea = async(req, res) => {
    try {

        // Extraer la tarea
        const { proyecto } = req.query;

        //Ubicar el proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //Comprobar si existe la tarea
        const existeTarea = await Tarea.findById(req.params.id);

        //Comprobar si existe la tarea
        if(!existeTarea) {
            return res.status(404).send({msg: 'No existe la tarea'});
        }

        //Revisar si el usuario autenticado es el dueño del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(404).send({msg: 'No autorizado'});
        }

        // Eliminar la tarea
        await Tarea.findByIdAndRemove({_id: req.params.id});

        //Respuesta
        res.json({msg: 'Tarea eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    };

};