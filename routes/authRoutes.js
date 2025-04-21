const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const axios = require('axios');
const User = require('../models/user')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const recaptchaKey = process.env.RECAPTCHA_SECRET_KEY

// imports

router.post('/signup', async (req, res) => {
  const { name, email, password, nickname, captchaToken } = req.body;
  if (!captchaToken) {
    return res.status(400).json({ message: "Token de recaptcha não fornecido!" });
  }
  try {
    const captchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: recaptchaKey,
          response: captchaToken
        }
      }
    );
    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: "Falha na verificação do reCAPTCHA" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já registrado" })
    }
    const existingNickname = await User.findOne({ nickname });
    if (existingNickname) {
      return res.status(400).json({ message: "Nickname já utilizado" })
    }
    const newUser = new User({ name, email, password, nickname });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "30d",
    });
    res.status(201).json({ message: "Usuário cadastrado com sucesso", token })
  } catch (err) {
    res.status(500).json({ error: "Erro ao cadastrar usuário:" + err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password, captchaToken, nickname } = req.body;
  if (!captchaToken) {
    return res.status(400).json({ message: "Captcha não enviado." })
  }
  try {
    const captchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: recaptchaKey,
          response: captchaToken
        }
      }
    );
    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: "Falha na verificação do reCAPTCHA" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Usuário não encontrado" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "14d",
    });
    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

module.exports = router;