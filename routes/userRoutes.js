const express = require('express');
const User = require('../models/user');
const verifyToken = require('../middlewares/jwtVerify');
const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não existe' })
    }
    res.json({ name: user.name, email: user.email })
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar usuário", err})
  }
});


module.exports = router;