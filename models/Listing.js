// models/Listing.js
const db = require('../config/database');

class Listing {
    // Créer une nouvelle annonce
    static async createListing(data) {
        const sql = `
            INSERT INTO listings (title, description, price, location, listing_type, user_id, agency_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const { title, description, price, location, listing_type, user_id, agency_id } = data;
        return db.query(sql, [title, description, price, location, listing_type, user_id, agency_id]);
    }

    // Obtenir une annonce par ID
    static async getListingById(listingId) {
        return db.query('SELECT * FROM listings WHERE listing_id = ?', [listingId]);
    }

    // Obtenir toutes les annonces
    static async getAllListings() {
        return db.query('SELECT * FROM listings');
    }

    // Mettre à jour une annonce
    static async updateListing(listingId, data) {
        const sql = `
            UPDATE listings
            SET title = ?, description = ?, price = ?, location = ?, listing_type = ?
            WHERE listing_id = ?
        `;
        const { title, description, price, location, listing_type } = data;
        return db.query(sql, [title, description, price, location, listing_type, listingId]);
    }

    // Supprimer une annonce
    static async deleteListing(listingId) {
        return db.query('DELETE FROM listings WHERE listing_id = ?', [listingId]);
    }

    // Rechercher des annonces par mots-clés
    static async searchListings(query) {
        const sql = `
            SELECT * FROM listings
            WHERE title LIKE ? OR description LIKE ? OR location LIKE ?
        `;
        const searchQuery = `%${query}%`;
        return db.query(sql, [searchQuery, searchQuery, searchQuery]);
    }

    // Filtrer les annonces par type et prix
    static async filterListings(filters) {
        let sql = 'SELECT * FROM listings WHERE 1=1';
        const params = [];

        if (filters.type) {
            sql += ' AND listing_type = ?';
            params.push(filters.type);
        }
        if (filters.minPrice) {
            sql += ' AND price >= ?';
            params.push(filters.minPrice);
        }
        if (filters.maxPrice) {
            sql += ' AND price <= ?';
            params.push(filters.maxPrice);
        }
        
        return db.query(sql, params);
    }
}

module.exports = Listing;
