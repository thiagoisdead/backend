const express = require('express');
const connectToDb = require('./db')
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = 3001;

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(helmet());
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));


const allowedOrigins = [
  'http://localhost:3000',
  'https://frontend-three-eosin-65.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());

app.use('/user', userRoutes);
app.use('/auth', authRoutes);


connectToDb();
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


