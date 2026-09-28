import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const User = db.User;

const serializeUser = (user) => {
    const values = user.get({ plain: true });
    delete values.password;
    return values;
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users.map(serializeUser));
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot get Users" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(serializeUser(user));
    } catch (error) {
        return res.status(500).json({ message: error.message, Error: 'Cannot get User' });
    }
}

export const createUser = async (req, res) => {
    try {
        const { username, email, password, name, profession, summary } = req.body;
        if (!username || !email || !password || !name) {
            return res.status(400).json({ message: 'username, email, password, and name are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            name,
            profession,
            summary
        });
        res.status(201).json(serializeUser(newUser));
    } catch (error) {
        res.status(500).json({ message: error.message, "Error": "Cannot create User" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const isOwner = String(req.user.id) === String(id);
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own account' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, role } = req.body;
        const updates = {};
        for (const field of ['username', 'email', 'name', 'profession', 'summary']) {
            if (Object.hasOwn(req.body, field)) updates[field] = req.body[field];
        }
        if (password) updates.password = await bcrypt.hash(password, 10);
        if (role !== undefined) {
            if (!isAdmin) {
                return res.status(403).json({ message: 'Only admins can change account roles' });
            }
            updates.role = role;
        }

        await user.update(updates);
        return res.status(200).json(serializeUser(user));
    } catch (error) {
        return res.status(500).json({ message: error.message, "Error": "Cannot update User" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const isOwner = String(req.user.id) === String(id);
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own account' });
        }

        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: 'User deleted successfully' });
        }

        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message, "Error": "Cannot delete User" });
    }
};
