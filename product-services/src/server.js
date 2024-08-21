const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));