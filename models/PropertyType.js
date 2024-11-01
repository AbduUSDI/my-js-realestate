// models/PropertyType.js
const db = require('../config/database');

class PropertyType {
    // Créer un type de propriété
    static async createType(typeName) {
        return db.query('INSERT INTO property_types (type_name) VALUES (?)', [typeName]);
    }

    // Lire tous les types de propriété
    static async getAllTypes() {
        return db.query('SELECT * FROM property_types');
    }

    // Supprimer un type de propriété
    static async deleteType(typeId) {
        return db.query('DELETE FROM property_types WHERE type_id = ?', [typeId]);
    }
}

module.exports = PropertyType;
