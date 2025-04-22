const listing = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");
const Review = require('./models/review.js');
const mongoose = require("mongoose");

module.exports.isloggedin =  (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        req.session.redirectURL= req.originalUrl;
        req.flash("error", "You must be signed in to create a property!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectURL = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listid = await listing.findById(id);
    if (!listid.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError(error.details[0].message, 400);
        
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        throw new ExpressError(error.details[0].message, 400);
    } else {
        next();
    }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId } = req.params;
    let list = await listing.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }   
    next();
};


