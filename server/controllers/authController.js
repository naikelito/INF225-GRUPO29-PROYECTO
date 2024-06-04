const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Personal = require('../models/Personal');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let personal = await Personal.findOne({ email });
        if (!personal) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, personal.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            personal: {
                id: personal.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Establecer la cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ msg: 'Inicio de sesión exitoso' });
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Controlador para cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Cierre de sesión exitoso' });
};
