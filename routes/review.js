const express = require("express");
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
const listing = require("../models/listing.js");
const Review = require('../models/review.js');
const {isloggedin, isReviewAuthor ,validateReview} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Add review
router.post('/',isloggedin, validateReview, wrapAsync( reviewController.createReview )); //001 in controllers/reviews.js

// Delete review
router.delete('/:reviewId',isloggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview)); //002 in controllers/reviews.js

module.exports = router;