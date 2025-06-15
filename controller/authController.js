const axios = require('axios');
const { validateEmail, validatePassword, validateCaptchaToken, validateLoginData } = require('../validator/userValidator');
const { registerUser, loginUser } = require('../services/userServices');
const secret = process.env.RECAPTCHA_SECRET_KEY
const qs = require('querystring');


async function signup(req, res) {
  const { name, email, password, nickname, captchaToken } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "E-mail inválido." });
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return res.status(400).json({ message: passwordValidation.message });
  }

  if (!validateCaptchaToken(captchaToken)) {
    return res.status(400).json({ message: "Token de recaptcha não fornecido!" });
  }


  try {
    const captchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      qs.stringify({
        secret: secret,
        response: captchaToken
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: "Falha na verificação do reCAPTCHA" });
    }
    const result = await registerUser({ name, email, password, nickname });

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao cadastrar usuário: " + err.message });
  }
}
async function login(req, res) {

  const { email, password, captchaToken } = req.body;

  const validation = validateLoginData(email, password, captchaToken);
  if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
  }

  try {
    const result = await loginUser(email, password, captchaToken);
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}

module.exports = {
  signup,
  login
};
