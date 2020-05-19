const express = require('express');
const router  = express.Router();
const passport = require('passport');
const User = require('../models/user');
const middleware = require('../middleware');

router.get("/", function(req, res){
	res.render("home");
})



//+++================================================================================================

//authentication routes

//show sign up form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
		   req.flash("success", "Successfully signed up! Welcome to WannaBuy, " + user.username +"!");
           res.redirect("/list");
        });
    });
});

// LOGIN ROUTES
//render login form
router.get("/login", (req, res)=>{
   res.render("login"); 
});
//login logic
//middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/list",
    failureRedirect: "/login"
}) ,(req, res)=>{
	//we dont need this callback function, middleware will deal with all the logic
});

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/list");
});



module.exports = router;