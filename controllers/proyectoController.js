const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

//POST - Crea un proyecto
exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }


    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Extraemos el usuarioid del header cargado en el JWT
        proyecto.creador = req.usuario.id

        //Guardamos en la base de datos
        proyecto.save();

        // Respondemos con los datos del proyecto almacenado
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor'); 
    }
}

//GET - Obtiene los proyectos del usuario
exports.obtenerProyecto = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({creado:-1}); // Buscara en la db todos los registros bajo el id del creador y los ordenara de forma descendente (Creado primero)
        res.json(proyectos)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

//PUT - Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    // Extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};

    // Agregamos una validacion por si en el futuro agregamos mas campos

    if(nombre){
        nuevoProyecto.nombre = nombre
    }

    try {

        // Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        // Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }

        // Actualizar
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, {new: true});
        res.json({proyecto});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

//DELETE - Elimina un proyecto
exports.eliminarProyecto = async (req, res) => {


    try {

        // Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyecto existe o no
        if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        // Verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }

        // Eliminar el Proyecto
        proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json({msg:'Proyecto Eliminado'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
