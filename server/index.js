const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const packageRoutes = require('./routes/packageRoute');
const app = express();
const PORT = 5000;
const dotenv = require('dotenv');
dotenv.config();
// Middleware
app.use(express.json());
app.use(cors());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
app.use('/admin', adminRoutes);

//user
app.use('/api', packageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
