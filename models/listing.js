const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review.js');


const listingschema =new schema({
        title: { 
                type: String,
                required: true
            },
        description: {
                type: String,
                required: true
            },
        image: {
                url: String,
                filename: String,
            },
        price: {
                type: Number,
                required: true
            },
        location: {
                type: String,
                required: true
            },
        country: {
                type: String,
                required: true
            },
        createdat: {
                type: Date,
                default: Date.now
            },
        reviews: [
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
                }
            ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        geometry:{
            type:{ 
                type: String,
                enum:["Point"],
                required :true
            },
            coordinates:{
                type :[Number],
                requires:true
            },
        }
        
});

listingschema.post("findOneAndDelete", async (listing)=> {
   if (listing) {
    await Review.deleteMany({_id : { $in: listing.reviews }});
   }
});


const listing= mongoose.model("listing", listingschema );
module.exports = listing;