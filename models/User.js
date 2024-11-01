const db = require('../config/database');

class User {
    // Créer un utilisateur
    static async createUser(data) {
        const sql = 'INSERT INTO users (username, email, password, full_name, phone_number, is_admin) VALUES (?, ?, ?, ?, ?, ?)';
        const { username, email, password, full_name, phone_number, is_admin } = data;
        return db.query(sql, [username, email, password, full_name, phone_number, is_admin]);
    }

    // Lire un utilisateur par ID
    static async getUserById(userId) {
        return db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    }

    // Lire tous les utilisateurs
    static async getAllUsers() {
        return db.query('SELECT * FROM users');
    }

    // Mettre à jour un utilisateur
    static async updateUser(userId, data) {
        const { username, email, full_name, phone_number } = data;
        const sql = 'UPDATE users SET username = ?, email = ?, full_name = ?, phone_number = ? WHERE user_id = ?';
        return db.query(sql, [username, email, full_name, phone_number, userId]);
    }

    // Supprimer un utilisateur
    static async deleteUser(userId) {
        return db.query('DELETE FROM users WHERE user_id = ?', [userId]);
    }

    // Authentification d'un utilisateur par email
    static async findByEmail(email) {
        return db.query('SELECT * FROM users WHERE email = ?', [email]);
    }
}

module.exports = User;
