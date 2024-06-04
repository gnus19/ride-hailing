const bcrypt = require('bcrypt');

/**
 * Encrypts the user's password
 * @param {string} password 
 * @returns `password` encrypted
 */
const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

/**
 * Compares a password with the user's one
 * @param {string} password Password to verify
 * @param {string} encryptedPassword Encrypted Password
 * @returns `true` if the password matches, `false` otherwise
 */
const comparePassword = async (password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword);
}

module.exports = {
    encryptPassword,
    comparePassword
}