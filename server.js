const express = require('express');
const connectToDb = require('./db')
const cors = require('cors');

const app = express();
const port = 3001;

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); 


app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/user', userRoutes); 
app.use('/auth', authRoutes); 


connectToDb();
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


