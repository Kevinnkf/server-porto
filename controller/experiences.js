import db from '../models/index.js';
import { formatMonth } from '../utils/dateHelper.js';

const Experience = db.Experiences;

export const getAllExperiences = async (req, res) => {
    try {
        const Experiences = await Experience.findAll();
        res.status(200).json(Experiences);
        if (!Experiences) {
            res.status(404).json({ message: 'No experiences found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving experiences', error });
    }
};

export const addExperience = async (req, res) => {
    try {
        const { company, role, startDate, endDate, description } = req.body;

        const formattedStartDate = formatMonth(new Date(startDate));
        const formattedEndDate = endDate ? formatMonth(new Date(endDate)) : 'Present';

        const newExperience = await Experience.create({
            company, role, formattedStartDate, formattedEndDate, description, userId: req.user.id
        });
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(500).json({ message: 'Error creating experience', error });
    };
};

export const editExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { company, role, startDate, endDate, description } = req.body;

        const experience = await Experience.findByPk(id);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        if (experience.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own experiences' });
        }

        // Update fields
        experience.company = company;
        experience.role = role;
        experience.startDate = formatMonth(new Date(startDate));
        experience.endDate = endDate ? formatMonth(new Date(endDate)) : 'Present';
        experience.description = description;

        // Save and return updated experience
        const updatedExperience = await experience.save();
        res.status(200).json(updatedExperience);

    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Error updating experience', error: error.message });
    }
};

export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await Experience.findByPk(id);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        if (experience.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own experiences' });
        }

        await experience.destroy();
        res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting experience', error: error.message });
    }
};