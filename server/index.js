const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const packageRoutes = require('./routes/packageRoute');
const authRoute = require('./routes/authRoute');
const { authMiddleware, adminAuthMiddleware } = require('./middlewares/authMiddlewares');
const app = express();
const { connectDB } = require('./db/db');
const dotenv = require('dotenv');
dotenv.config();
const PORT = 5000 || process.env.PORT;
// Middleware
app.use(express.json());
app.use(cors());
// MongoDB Connection
connectDB();

// Routes
app.use('/api/admin', authMiddleware, adminAuthMiddleware, adminRoutes);
//user
app.use('/api', packageRoutes);
app.use('/api', authRoute)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
