import express from 'express';
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Mock database
let users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

router.get('/', (req, res, next) => {
    res.send(users);
});

router.post('/', (req, res) => {
  const reqParams = req.body;
  users.push({...reqParams, id: uuidv4()})
  res.send(users);
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    //Throw error
  }
  res.send(foundUser);
});

router.patch('/:id', (req, res, next) => {
  const {id} = req.params;
  const {first_name, last_name, email} = req.body;
  const foundUser = users.find((user) => user.id === id);
  if (!foundUser) {
    //Throw error
  }
  if (first_name) foundUser.first_name = first_name;
  if (last_name) foundUser.last_name = last_name;
  if (email) foundUser.email = email;
  res.send(users);
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(users);
});

export default router;