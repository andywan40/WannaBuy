// all the middleware goes here
const Item = require('../models/item');
let middlewareObj = {}



// middlewareObj.checkItemOwnership = function(req, res, next){
// 	// is user logged in?
// 	if (req.isAuthenticated()){
// 		Item.findById(req.params.id, function(err, foundItem){
// 			if (err || !foundItem){
// 				req.flash("error", "Item not found!")
// 				res.redirect("back")
// 			}else{
// 				// does the user own the campground
// 				if (foundItem.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					req.flash("error", "You don't have permission to do that!")
// 					res.redirect('back');
// 				}
				
// 			}
// 		});
// 	}else{
// 		req.flash("error", "You need to be logged in to do that!")
// 		res.redirect("back");
// 	}
// };

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("primary", "Please Login or Sign up!")
    res.redirect("/login");
};


module.exports = middlewareObj;