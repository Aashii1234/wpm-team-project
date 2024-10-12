require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rentRoutes = require('./routes/rent'); // Adjust this if you have a different name

const aboutRoutes = require('./routes/about');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory
app.set('view engine', 'ejs');

// Homepage Route
app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs for the homepage
});

const MONGODB_URI = 'mongodb+srv://aashiiabbu:1234@rentlist.vryp0.mongodb.net/test'; // Replace with your credentials and cluster URL

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected to test database...'))
    .catch(err => console.error('MongoDB connection error:', err));



  
  app.use('/', reviewRoutes); 
// Use routes
app.use('/rent', rentRoutes);
app.use('/', aboutRoutes); // Include the about routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
