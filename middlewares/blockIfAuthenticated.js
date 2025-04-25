const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const blockIfAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return next(); 

  try {
    jwt.verify(token, jwtSecret);
    console.log(res)
    return res.status(403).json({ message: 'Você já está logado. Não pode acessar esta página.' });
  } catch {
    return next(); 
  }
};

module.exports = blockIfAuthenticated;
