const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Adjust the path if needed

// GET /reviews - Fetch and display reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 }); // Fetch all reviews sorted by date
        res.render('reviews', { reviews }); // Render reviews.ejs and pass reviews
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).send('Error retrieving reviews');
    }
});

// POST /reviews - Submit a new review
router.post('/', async (req, res) => {
    const { name, rating, comment } = req.body;

    try {
        const review = new Review({
            name,
            rating,
            comment,
        });
        await review.save();
        res.redirect('/reviews'); // Redirect to reviews page after submission
    } catch (error) {
        res.status(500).send('Error adding review');
    }
});
router.post('/submit-review', (req, res) => {
  const { name, review } = req.body;

  // Assuming you have a Review model set up for saving reviews
  const newReview = new Review({ name, review });

  newReview.save()
      .then(() => {
          // Redirect to a thank you page or render a thank you message
          res.render('thankyou'); // Create a thankYou.ejs view
      })
      .catch(err => {
          console.error(err);
          res.status(500).send('Error saving review');
      });
});

module.exports = router;

