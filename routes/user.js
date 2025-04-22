const express = require("express");
const router = express.Router(); 
const user = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectURL } = require("../middleware.js");
const usercontroller = require("../controllers/users.js");


router
    .route("/signup")
    // signup page redirect
    .get( usercontroller.rendersignup) //001 in controllers/users.js
    //signup page varification 
    .post( wrapAsync (usercontroller.signup)); //002 in controllers/users.js

router
    .route("/login")
    // login page redirect
    .get(usercontroller.renderlogin) //003 in controllers/users.js
    // login page varification and redirect 
    .post(saveRedirectURL,passport.authenticate('local', {failureRedirect: '/login', failureFlash : true}),usercontroller.loginredirect); //004 in controllers/users.js

//logout 
router.get("/logout", usercontroller.logout); //005 in controllers/users.js

module.exports = router;