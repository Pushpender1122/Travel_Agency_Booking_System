const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;