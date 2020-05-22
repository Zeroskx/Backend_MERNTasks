const express = require('express');
const conectarDB = require('./config/db'); // import en node
const cors = require('cors');



// Crear el servidor
const app = express();

// Conecta con la base de Datos
conectarDB();

// Habilitar cors para que podamos conectar front de back en el mismo local
app.use(cors());

// Habilitar express.json (Antes que existiera se usaba body.parser) de esta forma podremos leer los json que entren

app.use(express.json({ extended: true }));

// Si no existe la variable de entorno process.env.PORT, entonces asignale el puerto 4000
const port = process.env.port || 4000;

// Esto para separar los puertos de cliente Servidor: Cliente 3000 Servidor 4000

// Definir la pagina principal
/*
app.get('/', (req,res) => {
    res.send('Hola Mundo')
})
*/
console.log('Desde Index')

// Importar rutas iniciaran con api

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar la app

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});