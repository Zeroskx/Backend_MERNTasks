const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true); // eliminara el warning que nos salia (node:19352) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

// Buscar el archivo de Variables con dotenv
require('dotenv').config({
    path: 'variables.env'
});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO,{ // Para conectar con la DB recibe la url definida en el archivo de variables de entorno y configuraciones como 2do parametro
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Conectada')
    } catch (error) {
        console.log(error);
        process.exit(1)// Detiene la app si hay error
    }
}

module.exports = conectarDB;

