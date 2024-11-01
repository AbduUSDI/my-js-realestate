const db = require('../config/database');

class Favorite {
    // Ajouter une annonce aux favoris
    static async addFavorite(userId, listingId) {
        const sql = 'INSERT INTO favorites (user_id, listing_id) VALUES (?, ?)';
        return db.query(sql, [userId, listingId]);
    }

    // Lire toutes les annonces favorites d'un utilisateur
    static async getFavoritesByUserId(userId) {
        return db.query('SELECT * FROM favorites JOIN listings ON favorites.listing_id = listings.listing_id WHERE favorites.user_id = ?', [userId]);
    }

    // Supprimer une annonce des favoris
    static async removeFavorite(userId, listingId) {
        return db.query('DELETE FROM favorites WHERE user_id = ? AND listing_id = ?', [userId, listingId]);
    }
}

module.exports = Favorite;
