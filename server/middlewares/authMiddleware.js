const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied", code: "MISSING_TOKEN" });
    }
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        req.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token", code: "INVALID_TOKEN" });
    }
};

module.exports = verifyToken;