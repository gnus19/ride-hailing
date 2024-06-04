const jwt = require('jsonwebtoken');

/**
 * Creates a JWT token for the user's session
 * @param {{ userId: string, email: string }} payload 
 * @returns JWT token
 */
const createToken = (payload) => {
    return jwt.sign(payload, 'your-secret-key', {
        expiresIn: '1h',
    });
}

module.exports = {
    createToken
}