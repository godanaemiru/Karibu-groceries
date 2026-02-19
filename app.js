const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
require('dotenv').config();

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/procurement', require('./routes/procurementRoutes'));
app.use('/sales', require('./routes/salesRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Default Route
app.get('/', (req, res) => {
    res.send('Karibu Groceries API is Running. Go to /api-docs for documentation.');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});