import db from '../models/index.js';

const { Summary } = db;

export const getAllSummaries = async (req, res) => {
    try {
        //get all summaries from database
        const Summaries = await Summary.findAll();
        if (!Summaries) {
            return res.status(404).json({ message: 'No summaries found' });
        }
        // send response
        res.status(200).json(Summaries);

    } catch (error) {

        //catch error
        res.status(500).json({ message: 'Error retrieving summary', error });
    }
};

export const createSummary = async (req, res) => {
    try {
        const { content } = req.body;
        const newSummary = await Summary.create({
            content,
            userId: req.user.id
        });
        res.status(201).json(newSummary);
    } catch (error) {
        res.status(500).json({ message: 'Error creating summary', error });
    }
};

export const updateSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const summary = await Summary.findByPk(id);
        if (!summary) return res.status(404).json({ message: 'Summary not found' });

        if (summary.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own summaries' });
        }

        const [updated] = await Summary.update({
            content
        },
            { where: { id } }
        );
        if (updated) {
            const updatedSummary = await Summary.findOne({ where: { id } });
            res.status(200).json(updatedSummary);
        } else {
            res.status(404).json({ message: 'Summary update failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating summary', error });
    }
};

export const getSummaryById = async (req, res) => {
    try {
        const { id } = req.params;
        const summary = await Summary.findByPk(id);
        if (summary) {
            res.status(200).json(summary);
        } else {
            res.status(404).json({ message: 'Summary not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving summary', error: error.message });
    }
};

export const deleteSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const summary = await Summary.findByPk(id);

        if (!summary) {
            return res.status(404).json({ message: 'Summary not found' });
        }

        if (summary.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own summaries' });
        }

        await summary.destroy();
        res.status(200).json({ message: 'Summary deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting summary', error: error.message });
    }
};