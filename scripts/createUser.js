const User = require('./models/User');

const cadastrarUsuario = async () => {
  try {
    const novoUsuario = new User({
      name: 'João',
      email: 'joao@example.com',
      password: 'senha123',
    });

    await novoUsuario.save();
    console.log('Usuário cadastrado com sucesso');
  } catch (err) {
    console.error('Erro ao cadastrar:', err.message);
  }
};

cadastrarUsuario();
