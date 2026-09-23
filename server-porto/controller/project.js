import db from '../models/index.js';

const Project = db.Project;

export const getAllProjects = async (req, res) => {
    try {
        const Projects = await Project.findAll();
        res.status(200).json(Projects);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects', error });
    }
};

export const createProject = async (req, res) => {
    try {
        const { name, description, url, imageUrl } = req.body;
        const newProject = await Project.create({
            name,
            description,
            url,
            imageUrl,
            userId: req.user.id
        })
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (project.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own projects' });
        }

        await project.destroy();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, url, imageUrl } = req.body;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (project.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own projects' });
        }

        const [updated] = await Project.update({
            name,
            description,
            url,
            imageUrl
        },
            { where: { id } }
        );
        if (updated) {
            const updatedProject = await Project.findOne({ where: { id } });
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project update failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};