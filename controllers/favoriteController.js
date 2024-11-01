// controllers/favoriteController.js
const Favorite = require('../models/Favorite');

class FavoriteController {
    // Ajouter une annonce aux favoris
    static async addFavorite(req, res) {
        try {
            await Favorite.addFavorite(req.body.user_id, req.body.listing_id);
            res.status(201).json({ message: 'Annonce ajoutée aux favoris' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l’ajout aux favoris' });
        }
    }

    // Obtenir les annonces favorites d'un utilisateur
    static async getFavoritesByUserId(req, res) {
        try {
            const favorites = await Favorite.getFavoritesByUserId(req.params.user_id);
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des favoris' });
        }
    }

    // Supprimer une annonce des favoris
    static async removeFavorite(req, res) {
        try {
            await Favorite.removeFavorite(req.body.user_id, req.body.listing_id);
            res.status(200).json({ message: 'Annonce supprimée des favoris' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression des favoris' });
        }
    }
}

module.exports = FavoriteController;
