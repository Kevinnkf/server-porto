import db from '../models/index.js';

const User = db.User;

export const getAllUsers = async (req, res) => {
    try {
        const Users = await User.findAll();
        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot get Users" });
    }
}

import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            name
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot create User" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, { where: { id } });
        if (updated) {
            const updatedUser = await User.findOne({ where: { id } });
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot update User" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot delete User" });
    }
};