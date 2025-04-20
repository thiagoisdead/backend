const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado, token não fornecido' })
    }
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
    }
    catch (err) {
        return res.status(400).json({ message: 'Token expirado ou inválido' })
    };
};
module.exports = verifyToken;
