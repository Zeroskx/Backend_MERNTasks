// Valida un usuario
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); // Para comparar el password hasheado
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {

    // Revisar si hay errores

    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    
    // Extraer el email y password del request

    const { email, password } = req.body

    try {

        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({msg:'El usuario no existe'})
        }
        
        // Revisar si su password es correcto

        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        
        if(!passCorrecto) {
            return res.status(400).json({msg:'Password incorrecto'})
        }

        // Si todo es correcto pasamos el JWT
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
    }


}

// Obtiene el usuario ya creado para la autenticacion

exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); // Asi no devolvemos el password luego del login
        res.json({usuario});
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}