const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const postRoutes = require('./routes/postRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Database Middleware — connect on every request (Vercel serverless compatible)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// Routes — core features only (auth, media, posts)
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/posts', postRoutes);

// Health-check route
app.get('/', (req, res) => {
    res.send('Blog API is running successfully!');
});

// Server start (Vercel compatible — skipped in production)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
