// Crear un nuevo usuario
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    // Extraer email y password con destructuring

    const { email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea unico, consultando a la DB
        let usuario = await Usuario.findOne({email}); // Comprueba en mongo si existe el usuario con dicho email

        if (usuario) {
            return res.status(400).json({ msg:'El usuario ya existe'})
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password del usuario

        const salt = await bcryptjs.genSalt(1) // salt permite que incluso si el password es el mismo, el hash final sera distinto. De esta forma evitamos que los usuarios con el mismo password tengan el mismo hash. El numero que recibe son 
        usuario.password = await bcryptjs.hash(password, salt) // Recibe un string que hashear y el salt (Complejidad del hash)

        //Guarda el usuario
        await usuario.save();

        // Crear y firmar el JWT
        // El payload es informacion que va a guardar el Json Web Token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // Firmar el JWT

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn:3600 //Expira en 1 h ya que esta representado en segundos
            }, 
            (error,token) => { // callback

                if(error) throw error;

                // Mensaje de confirmacion
                res.json({ token:token });

            });

        

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}