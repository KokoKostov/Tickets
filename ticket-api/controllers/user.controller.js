const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../helpers/helpers');

const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const accessToken = generateAccessToken({ userId: newUser._id });
        const refreshToken = generateRefreshToken({ userId: newUser._id });

        res.status(201).json({ user: newUser, accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

// Other user-related methods like login, getUserProfile, etc.

module.exports = { registerUser };
