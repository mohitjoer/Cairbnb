if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');
const path = require("path");
const ejsmate = require("ejs-mate");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user.js');
const dbUrl = process.env.ALTASDB_URL;

const listingrouter = require('./routes/listing.js');
const reviewrouter = require('./routes/review.js');
const userrouter = require('./routes/user.js');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsmate);

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret :process.env.SECRET,
    },
    touchAfter:24 * 3600,
})

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionoptions = {
    store,
    secret :process.env.SECRET,
    resave : false,
    saveUninitialized : false, 
    cookie:{
        secure: false, 
        httpOnly : true,
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        maxAge : 7 * 24 * 60 * 60 * 1000, 
    },
}

app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});




console.log("MongoDB Connection String:", dbUrl); 

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
};

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});




app.use("/listings", listingrouter);

app.use("/listings/:id/reviews", reviewrouter);

app.use("/", userrouter);




// error handelers
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    console.error("Error Details:", err);
    const { statusCode = 500, message = "Something went wrong!" } = err; 
    res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
