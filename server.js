const express = require('express');
const connectToDb = require('./db')
const cors = require('cors');

const app = express();
const port = 3001;

const userRoutes = require('./routes/userRoutes'); // 👈 nova 
const authRoutes = require('./routes/authRoutes'); // 👈 nova 


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/user', userRoutes); // 👈 adiciona aqui a rota dos usuários
app.use('/auth', authRoutes); // 👈 adiciona aqui a rota de autenticação


connectToDb();
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


