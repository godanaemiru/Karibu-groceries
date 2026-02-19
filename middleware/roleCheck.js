const jwt = require('jsonwebtoken');

const requireRole = (requiredRole) => {
    return (req, res, next) => {
        // Get token from "Authorization: Bearer <token>" header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

        try {
            // Verify token using the secret from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if user has the correct role
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: `Access denied. Requires ${requiredRole} role.` });
            }

            req.user = decoded; // Add user info to request
            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

module.exports = requireRole;