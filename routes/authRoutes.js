const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const axios = require('axios');

const blockIfAuthenticated = require('../middlewares/blockIfAuthenticated');
const { loginLimiter, registerLimiter } = require('../middlewares/loginLimit');
const { signup, login } = require('../controller/authController');

const BlacklistToken = require('../models/blacklistToken');


require('dotenv').config();


router.post('/signup', blockIfAuthenticated, registerLimiter, signup);

router.post('/login', blockIfAuthenticated, loginLimiter, login);

router.post("/logout", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token não enviado.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const blacklistToken = new BlacklistToken({
      token,
      expiresAt,
    })
    await blacklistToken.save();

    return res.status(200).json({ message: "Logout realizado com sucesso" });
  } catch (err) {
    return res.status(400).json({ message: "Token inválido ou expirado" });
  }
});

module.exports = router;