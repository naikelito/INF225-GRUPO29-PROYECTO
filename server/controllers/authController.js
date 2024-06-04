const Paciente = require('../models/paciente');
const Personal = require('../models/Personal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Paciente.findOne({ email });

        if (user) {
            // Usuario encontrado en la colección de pacientes
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }

            const payload = {
                user: {
                    id: user.id,
                    type: 'Paciente'
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, userType: 'Paciente' });
                }
            );
        } else {
            user = await Personal.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Usuario no encontrado' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Contraseña incorrecta' });
            }

            const payload = {
                user: {
                    id: user.id,
                    type: 'Personal'
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, userType: 'Personal' });
                }
            );
        }
    } catch (err) {
        console.error('Error en el login:', err.message);
        res.status(500).send('Error del servidor');
    }
};


// Controlador para cerrar sesión
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Cierre de sesión exitoso' });
};
