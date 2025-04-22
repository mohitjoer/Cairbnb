const mongoose = require("mongoose");  
const listing = require("../models/listing.js");
const Review = require('../models/review.js');

//001
module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    let list = await listing.findById(id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    list.reviews.push(newreview);
    
    await newreview.save();
    await list.save();
    req.flash("success", "Successfully Added Review!");
    res.redirect(`/listings/${list._id}`);
};

//002
module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully Deleted Review!");
    res.redirect(`/listings/${id}`);
};