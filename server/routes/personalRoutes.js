const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Personal = require('../models/Personal');
const personalController = require('../controllers/personalController');
const auth = require('../middleware/auth');

router.get('/', personalController.getPersonal);

router.post('/register', async (req, res) => {
    const { nombre, rut, email, telefono, password, cargo } = req.body;
    try {
        let personal = await Personal.findOne({ email });
        if (personal) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        personal = new Personal({
            nombre,
            rut,
            email,
            telefono,
            password,
            cargo
        });

        // Encriptar la contraseña
        console.log('Generando salt');
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generado: ', salt);
        personal.password = await bcrypt.hash(password, salt);
        console.log('Contraseña encriptada');

        await personal.save();
        console.log('Usuario guardado en la base de datos');

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = router;
