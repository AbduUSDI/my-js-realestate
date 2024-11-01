// controllers/userController.js
const User = require('../models/user');

class UserController {
    // Créer un utilisateur
    static async createUser(req, res) {
        try {
            const newUser = await User.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
        }
    }

    // Obtenir un utilisateur par ID
    static async getUserById(req, res) {
        try {
            const user = await User.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    }

    // Obtenir tous les utilisateurs
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        }
    }

    // Mettre à jour un utilisateur
    static async updateUser(req, res) {
        try {
            await User.updateUser(req.params.id, req.body);
            res.status(200).json({ message: 'Utilisateur mis à jour' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
        }
    }

    // Supprimer un utilisateur
    static async deleteUser(req, res) {
        try {
            await User.deleteUser(req.params.id);
            res.status(200).json({ message: 'Utilisateur supprimé' });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
        }
    }
}

module.exports = UserController;
