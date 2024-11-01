// config/database.js
require('dotenv').config();
const mysql = require('mysql2/promise');

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    // Méthode pour obtenir la connexion
    async getConnection() {
        try {
            return await this.pool.getConnection();
        } catch (error) {
            console.error('Erreur de connexion à la base de données:', error);
            throw error;
        }
    }

    // Méthode pour exécuter une requête
    async query(sql, params) {
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Erreur lors de l’exécution de la requête:', error);
            throw error;
        }
    }
}

module.exports = new Database();
