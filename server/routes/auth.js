const { Router } = require('express');
const { validateLoginBody, validateRegisterBody } = require("../utils/authValidations");
const { createUser, findUserByEmail } = require('../repositories/auth');
const { encryptPassword, comparePassword } = require('../services/password');
const { createToken } = require('../services/jwt');

const router = Router();

router.get("/", (req, res) => {
    return res.sendStatus(200);
});

router.post("/register", ...validateRegisterBody, async (req, res) => {    
    const {
        name,
        surname,
        email,
        password,
    } = req.body;

    const hashedPassword = await encryptPassword(password)
    try {
        await createUser({
            name,
            surname,
            email,
            password: hashedPassword
        })
        return res.status(201).json({ message: `User ${email} registered successfully`});
    } catch (error) {
        return res.status(400).json({ message: `User ${email} already exists`});
    }
});

router.post("/login", ...validateLoginBody, async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password"});
            
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Error validating credentials" });
        }

        const isPasswordMatching = await comparePassword(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({ message: "Error validating credentials" });
        }

        const token = createToken({ userId: user._id, email: user.email });
        return res.status(200).json({ token });
    } catch (error) {
        console.log("[ERROR]: ", error)
        return res.status(500).json({ message: 'There was and error trying to login, please try again later' });
    }
});

module.exports = router;