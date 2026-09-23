import db from '../models/index.js';

const Certification = db.Certification;

export const getAllCertifications = async (req, res) => {
    try {
        const certifications = await Certification.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(certifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving certifications', error: error.message });
    }
};

export const getCertificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const certification = await Certification.findByPk(id);
        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.status(200).json(certification);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving certification', error: error.message });
    }
};

export const createCertification = async (req, res) => {
    try {
        const { title, issuer, issueDate, expirationDate, credentialId, credentialUrl, imageUrl, description } = req.body;
        if (!title || !issuer) {
            return res.status(400).json({ message: 'Title and issuer are required' });
        }

        const newCert = await Certification.create({
            title,
            issuer,
            issueDate,
            expirationDate,
            credentialId,
            credentialUrl,
            imageUrl,
            description,
            userId: req.user.id
        });
        res.status(201).json(newCert);
    } catch (error) {
        res.status(500).json({ message: 'Error creating certification', error: error.message });
    }
};

export const updateCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, issuer, issueDate, expirationDate, credentialId, credentialUrl, imageUrl, description } = req.body;

        const cert = await Certification.findByPk(id);
        if (!cert) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        await cert.update({
            title: title !== undefined ? title : cert.title,
            issuer: issuer !== undefined ? issuer : cert.issuer,
            issueDate: issueDate !== undefined ? issueDate : cert.issueDate,
            expirationDate: expirationDate !== undefined ? expirationDate : cert.expirationDate,
            credentialId: credentialId !== undefined ? credentialId : cert.credentialId,
            credentialUrl: credentialUrl !== undefined ? credentialUrl : cert.credentialUrl,
            imageUrl: imageUrl !== undefined ? imageUrl : cert.imageUrl,
            description: description !== undefined ? description : cert.description,
        });

        res.status(200).json(cert);
    } catch (error) {
        res.status(500).json({ message: 'Error updating certification', error: error.message });
    }
};

export const deleteCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const cert = await Certification.findByPk(id);
        if (!cert) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        await cert.destroy();
        res.status(200).json({ message: 'Certification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting certification', error: error.message });
    }
};
