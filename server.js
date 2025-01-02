import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';

dotenv.config();  // Load environment variables from .env

const app = express();
// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_CONNECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hello, I am from HomePage!')
});

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Ready!, ${process.env.SERVER_URL}`)
});