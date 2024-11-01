// admin.js
const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const db = require('./config/database'); // Import de la base de données

const app = express();

// Configuration des en-têtes de sécurité avec Helmet
app.use(helmet());

// Configuration de la gestion des sessions
app.use(session({
    secret: 'votre_secret_de_session',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));

// Protection CSRF
const csrfProtection = csrf();
app.use(csrfProtection);

// Limiteur de taux pour limiter les requêtes
const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limite de 100 requêtes
});
app.use('/admin', adminLimiter);

// Middleware pour authentifier les utilisateurs
function checkAuth(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
        return next();
    } else {
        return res.status(403).send('Accès refusé');
    }
}

// Route pour afficher la page administrateur avec protection
app.get('/admin', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Exemple de route POST avec protection CSRF et validation des entrées
app.post('/admin/add-listing', checkAuth, async (req, res) => {
    const safeTitle = sanitizeHtml(req.body.title);
    const safeDescription = sanitizeHtml(req.body.description);
    
    try {
        const result = await db.query(
            'INSERT INTO listings (title, description) VALUES (?, ?)',
            [safeTitle, safeDescription]
        );
        res.json({ message: 'Annonce ajoutée en sécurité', listingId: result.insertId });
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’annonce:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Gestion des erreurs CSRF
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ error: 'Erreur de vérification CSRF' });
    }
    next(err);
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur administrateur en cours d'exécution sur le port ${PORT}`);
});
