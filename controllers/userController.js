import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register User
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({ error: "User already exists!" });
        }

        user = new User({
            first_name,
            last_name,
            email,
            password,
        });

        await user.save();
        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

// Login User and Return JWT Token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: "Invalid credentials" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).send({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        console.error(error);
        res.send('Server Error');
    }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).send({error: "User not found!"});
        }
        res.send(user);
    } catch (error) {
        console.error(error);
        res.send('Server Error');
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.send('User Deleted Successfully!');
    } catch (error) {
        
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const inputData = req.body;
        const user = await User.findByIdAndUpdate(id, inputData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
    } catch (error) {
        
    }
}

export default {
    createUser,
    getUser,
    deleteUser,
    getAllUsers,
    updateUser,
    registerUser,
    loginUser
}
