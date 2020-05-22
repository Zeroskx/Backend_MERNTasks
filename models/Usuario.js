const mongoose = require('mongoose');

// Definir la estructura de la coleccion

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true, //trim nos ayudara a eliminar los espacios vacios que esten al inicio o al final, evitando recibir nombres como ' julio' o 'julio   '
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // Nos permite tener un correo unico
    },
    password: {
        type: String,
        required: true,
        trim: true, //trim nos ayudara a eliminar los espacios vacios que esten al inicio o al final, evitando recibir nombres como ' julio' o 'julio   '
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema); // Aqui definimos el Esquema llamado Usuario 