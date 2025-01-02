import User from "../models/user.js";

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

export default {
    createUser,
    getUser,
    deleteUser,
    getAllUsers
}
