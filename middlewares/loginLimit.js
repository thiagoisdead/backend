const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 15,
    message: "Muitas tentativas de Login. Tente novamente após 5 minutos.",
    standardHeaders: true, 
    legacyHeaders: false, 
})

const registerLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 15, 
    message: "Muitas tentativas de Registro. Tente novamente após 5 minutos.",
});

module.exports = { loginLimiter, registerLimiter };