// all the middleware goes here
let middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("primary", "Please Login or Sign up!")
    res.redirect("/login");
};


module.exports = middlewareObj;