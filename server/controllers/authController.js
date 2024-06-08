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
                    rut: user.rut, // Asegúrate de que el campo 'rut' está presente
                    type: 'Paciente'
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, userType: 'Paciente', user: { id: user.id, rut: user.rut, email: user.email, nombre: user.nombre, cargo: 'Paciente' } });
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
                    rut: user.rut, // Asegúrate de que el campo 'rut' está presente
                    type: user.cargo // Utiliza el cargo del personal como tipo de usuario
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, userType: user.cargo, user: { id: user.id, rut: user.rut, email: user.email, nombre: user.nombre, cargo: user.cargo } });
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
