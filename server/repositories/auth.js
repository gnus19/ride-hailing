const User = require('../models/user');

/**
 * Creates the user in db
 * @param {{name: string, surname: string, email: string,  password: string}} user User's data
 */
const createUser = async(user) => {
    const newUser = new User(user);
    await newUser.save();
}

/**
 * Search the user in db
 * @param {string} email
 * @returns User matched with `email`, `null` in case its doesn't
 */
const findUserByEmail = async (email) => {
    return await User.findOne({ email })
}

module.exports = {
    createUser,
    findUserByEmail
}