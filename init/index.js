const mongoose = require('mongoose');
const initdata = require("./data.js");
const listing = require("../models/listing.js");


const mongo_url = 'mongodb://127.0.0.1:27017/cairbnb';
main()
.then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

const initdb = async () =>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: '67fd25d2b31ce31e0da735a5',
        geometry: { 
            type: "Point",
            coordinates: [0, 0] 
        }
    }));
    console.log("Coordinates:", [0, 0]);
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
    console.log(initdata.data);
};

initdb();