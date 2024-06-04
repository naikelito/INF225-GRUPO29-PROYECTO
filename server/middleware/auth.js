const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ msg: 'No token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.personal = decoded.personal;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
