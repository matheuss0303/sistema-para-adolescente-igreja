// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-igreja-geracao-eleita';

module.exports = function autenticar(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Faça login.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; // req.usuario agora tem: id, nome e perfil
        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Sessão inválida ou expirada.' });
    }
};