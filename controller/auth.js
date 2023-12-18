const userModel = require("../models/userModel");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Name, Email, and Password are required." });
        }

        const passwordHash = await argon2.hash(password);

        const userDetails = await userModel.create({
            username: username,
            email: email,
            password: passwordHash,

        });
        const token = jwt.sign({ username: userDetails.username, _id: userDetails._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({user : userDetails, token : token});
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ error: "An error occurred while creating the user." });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Name and Password are required." });
        }

        const foundUser = await userModel.findOne({ username: username });

        if (!foundUser) {
            return res.status(401).json({ error: "Authentication failed. User not found." });
        }

        const isPasswordValid = await argon2.verify(foundUser.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Authentication failed. Invalid password." });
        }

        const token = jwt.sign({ username: foundUser.username, _id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token:', token);
        res.header('Authorization', token).json({ message: "Login successful", data: token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { register, login };
