import db from '../models/index.js';

const { User } = db;

const asLegacySummary = (user) => ({
    id: user.id,
    userId: user.id,
    content: user.summary
});

export const getAllSummaries = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'summary'],
            where: { summary: { [db.Sequelize.Op.ne]: null } }
        });
        return res.status(200).json(users.map(asLegacySummary));
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving summaries', error: error.message });
    }
};

export const createSummary = async (req, res) => {
    try {
        const { content } = req.body;
        if (typeof content !== 'string' || !content.trim()) {
            return res.status(400).json({ message: 'content is required' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const wasEmpty = !user.summary;
        await user.update({ summary: content.trim() });
        return res.status(wasEmpty ? 201 : 200).json(asLegacySummary(user));
    } catch (error) {
        return res.status(500).json({ message: 'Error saving profile summary', error: error.message });
    }
};

export const updateSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (typeof content !== 'string' || !content.trim()) {
            return res.status(400).json({ message: 'content is required' });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isOwner = String(user.id) === String(req.user.id);
        const isAdmin = req.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own profile summary' });
        }

        await user.update({ summary: content.trim() });
        return res.status(200).json(asLegacySummary(user));
    } catch (error) {
        return res.status(500).json({ message: 'Error updating profile summary', error: error.message });
    }
};

export const getSummaryById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: ['id', 'summary'] });
        if (!user || user.summary == null) {
            return res.status(404).json({ message: 'Summary not found' });
        }
        return res.status(200).json(asLegacySummary(user));
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving profile summary', error: error.message });
    }
};

export const deleteSummary = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isOwner = String(user.id) === String(req.user.id);
        const isAdmin = req.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Forbidden: You can only clear your own profile summary' });
        }

        await user.update({ summary: null });
        return res.status(200).json({ message: 'Profile summary cleared successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error clearing profile summary', error: error.message });
    }
};
