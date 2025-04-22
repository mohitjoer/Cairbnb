const user = require("../models/user.js"); 

//001
module.exports.rendersignup =(req, res) => {
    res.render("users/signup.ejs");
};

///002
module.exports.signup = async (req, res) => {  
    try{
        let {username,email,password} = req.body;
        const newuser = new user({username, email});
        const registereduser = await user.register(newuser, password);
        req.login(registereduser, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect(res.locals.redirectURL || "/listings");
            req.flash("success", "User registered successfully!");
        });
    }  
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

//003
module.exports.renderlogin = (req, res) => {
    res.render("users/login.ejs");
};

//004
module.exports.loginredirect = async (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectURL = res.locals.redirectURL || "/listings";
    res.redirect(redirectURL);
};

//005
module.exports.logout = (req, res) => {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    });
};