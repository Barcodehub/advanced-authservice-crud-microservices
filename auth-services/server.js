const express = require('express');
const connectDB = require('./src/config/database');
const setupMiddleware = require('./src/middleware');
const initAdmin = require('./src/config/initAdmin');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();
initAdmin();

setupMiddleware(app);

// Routes
app.use('/api/auth', require('./src/routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));