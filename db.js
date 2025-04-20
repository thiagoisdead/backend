const mongoose = require('mongoose');

require('dotenv').config();

const dbUri = process.env.dbUri;


let isConnected = false;

const connectToDb = async () => {
  if (isConnected) {
    console.log('Já estamos conectados ao banco de dados.');
    return;
  }
  
  try {
    await mongoose.connect(dbUri);
    isConnected = true; 
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB desconectado');
  isConnected = false; 
});

module.exports = connectToDb;
