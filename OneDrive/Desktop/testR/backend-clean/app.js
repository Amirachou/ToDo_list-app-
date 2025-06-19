// app.js
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const userRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/user', userRoutes);
app.get('/', (_, res) => res.send('Server is up'));

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`serveur is running on ${PORT}`));
