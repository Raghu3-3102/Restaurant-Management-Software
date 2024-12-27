const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
require('dotenv').config();

// Import routes for APIs
const userRoutes = require('./Routes/userRoutes');
const foodRoutes = require('./Routes/foodRoutes');

// Database configuration (if needed)
const db_config = require('./config/db_config');  // Ensure you use this if required

// Port setup
const port = process.env.PORT || 5000;

// API routes
app.use('/api/user', userRoutes);


// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'my-vite/dist')));

// Handle fallback for Single Page Application (SPA) - React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-vite/dist', 'index.html'));
});

// Global error handling (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
