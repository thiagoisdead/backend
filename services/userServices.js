const User = require('../models/user');
const jwt = require('jsonwebtoken');
const recaptchaKey = process.env.RECAPTCHA_SECRET_KEY;
const jwtSecret = process.env.JWT_SECRET;
const axios = require('axios')
const bcrypt = require('bcryptjs')

async function registerUser({ name, email, password, nickname }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email já registrado");
  }

  const existingNickname = await User.findOne({ nickname });
  if (existingNickname) {
    throw new Error("Nickname já utilizado");
  }

  const newUser = new User({ name, email, password, nickname });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return { message: "Usuário cadastrado com sucesso", token };
}

async function loginUser(email, password, captchaToken) {
  const captchaResponse = await axios.post(

    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: {
        secret: recaptchaKey,
        response: captchaToken
      }
    }
  );


  if (!captchaResponse.data.success) {
    return { status: 400, data: { message: 'Falha na verificação do reCAPTCHA' } };
  }

  // Verificar usuário
  const user = await User.findOne({ email });
  if (!user) {
    return { status: 401, data: { message: 'Usuário não encontrado' } };
  }

  // Verificar senha
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { status: 401, data: { message: 'Senha incorreta' } };
  }

  // Gerar token
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '14d' });

  return {
    status: 200,
    data: {
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      }
    }
  };
}

module.exports = {
  registerUser,
  loginUser
};
