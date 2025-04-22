const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const {isloggedin, isOwner ,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

router
    .route("/")
    // List properties
    .get(wrapAsync(listingController.index)) //001 in controllers/listings.js
    
    //new property update
    .post(isloggedin,upload.single("listing[image]"),validateListing, wrapAsync(listingController.newListing)); //004 in controllers/listings.js

//new property 
router.get('/new',isloggedin, listingController.renderNewForm); //002 in controllers/listings.js

router
    .route("/:id")
    // show property
    .get(wrapAsync(listingController.showListing)) //003 in controllers/listings.js
    // edit and Update property
    .put( isloggedin, isOwner ,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing)) //006 in controllers/listings.js
    // Delete property
    .delete( isloggedin, isOwner ,wrapAsync( listingController.deleteListing)); //007 in controllers/listings.js


// Edit property 
router.get('/:id/edit', isloggedin, isOwner , wrapAsync(listingController.editListing)); //005 in controllers/listings.js  




module.exports = router;