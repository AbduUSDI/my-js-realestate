// controllers/agencyController.js
const Agency = require('../models/Agency');

class AgencyController {
    // Créer une agence
    static async createAgency(req, res) {
        try {
            const newAgency = await Agency.createAgency(req.body);
            res.status(201).json(newAgency);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l’agence' });
        }
    }

    // Obtenir une agence par ID
    static async getAgencyById(req, res) {
        try {
            const agency = await Agency.getAgencyById(req.params.id);
            res.status(200).json(agency);
        } catch (error) {
            res.status(404).json({ error: 'Agence non trouvée' });
        }
    }

    // Obtenir toutes les agences
    static async getAllAgencies(req, res) {
        try {
            const agencies = await Agency.getAllAgencies();
            res.status(200).json(agencies);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des agences' });
        }
    }

    // Mettre à jour une agence
    static async updateAgency(req, res) {
        try {
            await Agency.updateAgency(req.params.id, req.body);
            res.status(200).json({ message: 'Agence mise à jour' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l’agence' });
        }
    }

    // Supprimer une agence
    static async deleteAgency(req, res) {
        try {
            await Agency.deleteAgency(req.params.id);
            res.status(200).json({ message: 'Agence supprimée' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de l’agence' });
        }
    }
}

module.exports = AgencyController;
