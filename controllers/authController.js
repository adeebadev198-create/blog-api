const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER (Signup) Function
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check karein ke user pehle se database mein hai ya nahi
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Password ko hash (encrypt) karein taaki database mein plain text save na ho
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Naya user database mein create karein
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Agar role nahi diya to default 'user' hoga
        });

        res.status(201).json({ 
            message: 'User registered successfully', 
            userId: user._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. LOGIN Function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User ko email se dhoondein
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Password match karein (jo user ne dala hai aur jo database mein hash hai)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // JWT Token generate karein (Login successful hone par)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token 1 din tak valid rahega
        );

        // Response bhejein
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            user: { id: user._id, name: user.name, role: user.role } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dono functions ko export karein taaki routes use kar sakein
module.exports = { registerUser, loginUser };