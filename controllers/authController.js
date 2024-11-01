// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    // Inscription
    static async register(req, res) {
        try {
            const { username, email, password, full_name, phone_number } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'Cet email est déjà utilisé' });
            }

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Créer l'utilisateur
            const newUser = await User.createUser({
                username,
                email,
                password: hashedPassword,
                full_name,
                phone_number,
                is_admin: false  // Défini par défaut comme utilisateur normal
            });

            res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de l’inscription' });
        }
    }

    // Connexion
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe
            const user = await User.findByEmail(email);
            if (user.length === 0) {
                return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
            }

            // Vérifier le mot de passe
            const validPassword = await bcrypt.compare(password, user[0].password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
            }

            // Créer le token JWT
            const token = jwt.sign(
                { userId: user[0].user_id, isAdmin: user[0].is_admin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Stocker le token dans un cookie sécurisé
            res.cookie('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({ message: 'Connexion réussie', token });
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        }
    }

    // Déconnexion
    static logout(req, res) {
        // Supprime le cookie de token
        res.clearCookie('auth_token');
        res.status(200).json({ message: 'Déconnexion réussie' });
    }

    // Vérification de l'authentification
    static verifyToken(req, res, next) {
        const token = req.cookies.auth_token || req.headers['authorization'];
        
        if (!token) {
            return res.status(403).json({ error: 'Accès refusé' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token invalide' });
        }
    }
}

module.exports = AuthController;
