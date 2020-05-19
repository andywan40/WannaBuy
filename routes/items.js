const express = require('express');
const router  = express.Router();
const Item = require('../models/item');
const middleware = require('../middleware');




router.get("/list",middleware.isLoggedIn,  function(req, res){
	Item.find({},function(err, itemsFound){
		if (err || !itemsFound){
			console.log(err)
			res.redirect("home")
		}else{
			res.render("items/list", {items:itemsFound})
		}
	})
})

router.post("/list",middleware.isLoggedIn, function(req, res){
	//get data from form and add it to database;
	//redirect back to "/list"
	const name = req.body.name;
	const brand = req.body.brand;
	const year = req.body.year;
	const retail = req.body.retail;
	const image = req.body.image;
	const description = req.body.description;
	const obj = {
		name: name,
		brand: brand,
		year: year,
		retail: retail, 
		image: image,
		description: description
	}
	Item.create(obj, function(err, itemCreated){
		if (err){
			console.log(err);
		}else {
			req.flash("success", "Successfully created a new item!");
			res.redirect("/list");
		}
	})
	
})
//show create form 
router.get("/list/new", middleware.isLoggedIn, (req, res) =>{
	res.render("items/new");
})

//show item
router.get("/list/:id", middleware.isLoggedIn, (req,res) => {
	
	Item.findById(req.params.id,function(err, itemFound){
		if (err || !itemFound){
			req.flash("error", "Item not found!");
			res.redirect("items/show");
		}else{
			res.render("items/show", {item:itemFound})
		}
	})
})

//show edit form
router.get("/list/:id/edit", middleware.isLoggedIn, (req, res) =>{
	Item.findById(req.params.id, (err, itemFound) => {
		if (err || !itemFound){
			res.redirect("back")
		}else{
			res.render("items/edit", {item:itemFound});
		}
	})
})

//update item
router.put("/list/:id", (req, res)=> {
	Item.findByIdAndUpdate(req.params.id, req.body.item , (err, itemUpdated) =>{
		if (err){
			res.redirect("back");
		}else{
			req.flash("success", "Successfully updated a new item!");
			res.redirect("/list/" + req.params.id);
		}
	})
})

//delete item
router.delete("/list/:id", (req ,res)=> {
	Item.findByIdAndRemove(req.params.id, err=> {
		if (err){
			res.redirect("/list");
		}else{
			req.flash("success", "Successfully deleted an item!")
			res.redirect("/list");
		}
	});
});


module.exports = router;
