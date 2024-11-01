const db = require('../config/database');

class Agency {
    // Créer une agence
    static async createAgency(data) {
        const sql = 'INSERT INTO agencies (agency_name, address, phone_number, email) VALUES (?, ?, ?, ?)';
        const { agency_name, address, phone_number, email } = data;
        return db.query(sql, [agency_name, address, phone_number, email]);
    }

    // Lire une agence par ID
    static async getAgencyById(agencyId) {
        return db.query('SELECT * FROM agencies WHERE agency_id = ?', [agencyId]);
    }

    // Lire toutes les agences
    static async getAllAgencies() {
        return db.query('SELECT * FROM agencies');
    }

    // Mettre à jour une agence
    static async updateAgency(agencyId, data) {
        const { agency_name, address, phone_number, email } = data;
        const sql = 'UPDATE agencies SET agency_name = ?, address = ?, phone_number = ?, email = ? WHERE agency_id = ?';
        return db.query(sql, [agency_name, address, phone_number, email, agencyId]);
    }

    // Supprimer une agence
    static async deleteAgency(agencyId) {
        return db.query('DELETE FROM agencies WHERE agency_id = ?', [agencyId]);
    }

    // Rechercher des agences par nom ou adresse
    static async searchAgencies(query) {
        const sql = 'SELECT * FROM agencies WHERE agency_name LIKE ? OR address LIKE ?';
        const searchQuery = `%${query}%`;
        return db.query(sql, [searchQuery, searchQuery]);
    }
}

module.exports = Agency;
