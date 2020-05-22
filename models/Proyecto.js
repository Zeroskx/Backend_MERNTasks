const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, // Asi linkeamos con la coleccion de usuario
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyecto', ProyectoSchema); // Aqui definimos el Esquema llamado Usuario 