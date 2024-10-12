const express = require('express');
const router = express.Router();
const Car = require('../models/Rent'); // Assuming your model file is named Rent.js

// GET /rent - Fetch and display cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars
        res.render('rent', { cars }); // Pass cars to rent.ejs
    } catch (error) {
        console.error('Error retrieving cars:', error);
        res.status(500).send('Error retrieving cars');
    }
});

// GET /rent/add - Render add car form
router.get('/add', (req, res) => {
    res.render('addRent'); // Render the form to add a new car
});

// POST /rent - Add a new car
router.post('/', async (req, res) => {
    const { name, price, description, image, available } = req.body;

    try {
        const car = new Car({
            name,
            price,
            description,
            image: image || '/images/default.png', // Placeholder image if not provided
            available: available === 'on', // Convert checkbox input to boolean
        });
        await car.save();
        res.redirect('/rent'); // Redirect to the rent page after adding
    } catch (error) {
        res.status(500).send('Error adding car');
    }
});
router.post('/process', (req, res) => {
    const { vehicleName, vehiclePrice, vehicleDescription } = req.body;

    // Render the payment form with vehicle details
    res.render('payment', { vehicleName, vehiclePrice, vehicleDescription });
});
// Route to confirm payment
router.post('/confirm', (req, res) => {
    const { vehicleName, vehiclePrice, vehicleDescription, cardNumber, cvv, mobileNumber } = req.body;

    // Here you would process the payment (this can be integrated with a payment gateway)
    console.log(`Vehicle Name: ${vehicleName}, Price: ${vehiclePrice}, Description: ${vehicleDescription}, Card Number: ${cardNumber}, CVV: ${cvv}, Mobile: ${mobileNumber}`);

    // Redirect or render a confirmation page
    res.send('Payment processed successfully!');
});

module.exports = router;

