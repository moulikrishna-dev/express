import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import mongoose from 'mongoose';
import userController from './controllers/userController.js';

const app = express();

const PORT = 5000;
const MONGO_DB_NAME = 'sample';

// Connect to MongoDB
mongoose
  .connect(`mongodb://localhost:27017/${MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hello, I am from HomePage!')
});
//app.use('/users', userRoutes);
app.get('/users', userController.getAllUsers);
app.post('/users', userController.createUser);
app.get('/users/:id', userController.getUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(PORT, () => {
    console.log(`Server Ready!, http://localhost:${PORT}`)
});