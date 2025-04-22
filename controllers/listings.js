const listing = require('../models/listing');
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { query } = require('express');
const maptoken = process.env.MAP_TOKEN ;
const geocodingClient =  mbxGeocoding({ accessToken: maptoken });

//001
module.exports.index =async (req, res, next) => {
    const list = await listing.find({});
    res.render('listings/listing.ejs', { list });
};

//002
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

//003
module.exports.showListing =  async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(); 
    const list = await listing.findById(id)
    .populate({
        path:"reviews",
        populate:{path:"author"},
    }).populate("owner");
    if (!list) {
        req.flash("error", "Cannot find that property!");
        return res.redirect("/listings"); 
    }
    res.render("listings/show.ejs", { list });
};

//004
module.exports.newListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location ,
        limit:1,
    })
    .send()

    let url = req.file.path;
    let filename = req.file.filename;

    const list = new listing(req.body.listing);
    list.image = { url, filename }; 
    list.owner = req.user._id;
    list.geometry = response.body.features[0].geometry;
    await list.save();
    req.flash("success", "Successfully Created New Property!");
    res.redirect("/listings");
};

//005
module.exports.editListing = async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    const list = await listing.findById(id);
    if (!list) return next();
    let origainalImageUrl = list.image.url;
    origainalImageUrl = origainalImageUrl.replace("/upload","/upload/h_300,w_250");
    res.render('listings/edit.ejs', { list , origainalImageUrl });
};

//006
module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(req.file){
    const url = req.file.path;
    const filename = req.file.filename;
    list.image = { url, filename };
    await list.save();
    }
    
    req.flash("success", "Successfully Updated The Property!");
    res.redirect(`/listings/${id}`);
};

//007
module.exports.deleteListing =async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next();
    await listing.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted The Property!");
    res.redirect("/listings");
};