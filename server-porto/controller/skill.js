import db from '../models/index.js';

const Skill = db.Skill;

export const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving skills', error: error.message });
    }
};

export const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByPk(id);
        if (skill) {
            res.status(200).json(skill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving skill', error: error.message });
    }
};

export const createSkill = async (req, res) => {
    try {
        const { name, level } = req.body;
        const newSkill = await Skill.create({
            name,
            level,
            userId: req.user.id
        });
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(500).json({ message: 'Error creating skill', error: error.message });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, level } = req.body;

        const skill = await Skill.findByPk(id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (skill.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own skills' });
        }

        const [updated] = await Skill.update({
            name, level
        },
            { where: { id } }
        );
        if (updated) {
            const updatedSkill = await Skill.findByPk(id);
            res.status(200).json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill update failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating skill', error: error.message });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findByPk(id);

        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        if (skill.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own skills' });
        }

        await skill.destroy();
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting skill', error: error.message });
    }
};
