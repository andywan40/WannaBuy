const express = require('express');
const router  = express.Router();
const Item = require('../models/item');
const middleware = require('../middleware');



router.get("/list",middleware.isLoggedIn,  function(req, res){
	//finds all the items that are associated with the user and shows them
	Item.find({author: req.user.username},function(err, itemsFound){
		if (err || !itemsFound){
			req.flash("error", "Cannot find items!");
			res.redirect("home")
		}else{
			res.render("items/list", {items:itemsFound})
		}
	})
})

router.get("/list/c/:category",middleware.isLoggedIn,  function(req, res){
	//finds all the items that are associated with the user under the category and shows them
	console.log(req, res);
	Item.find({author: req.user.username, type:req.params.category},function(err, itemsFound){
		if (err || !itemsFound){
			console.log(err)
			req.flash("error", "Cannot find items!");
			res.redirect("back")
		}else{
			res.render("items/list", {items:itemsFound})
		}
	})
})








//show create form 
router.get("/list/new", middleware.isLoggedIn, (req, res) =>{
	res.render("items/new");
})

//create
router.post("/list",middleware.isLoggedIn, function(req, res){
	//get data from form and add it to database;
	//redirect back to "/list"
	const name = req.body.name;
	const color = req.body.color;
	const brand = req.body.brand;
	const year = req.body.year;
	const retail = req.body.retail;
	const front_image = req.body.front_image;
	const back_image = req.body.back_image;
	const description = req.body.description;
	const website = req.body.website;
	const type= req.body.type;
	const author = req.user.username;
	const obj = {
		name: name,
		color: color,
		brand: brand,
		year: year,
		retail: retail, 
		front_image: front_image,
		back_image: back_image,
		description: description, 
		website: website,
		type:type,
		author:author
	}
	Item.create(obj, function(err, itemCreated){
		if (err){
			req.flash("error", "Cannot create an item!");
		}else {
			req.flash("success", "Successfully created a new item!");
			res.redirect("/list");
		}
	})
	
})

//show item
router.get("/list/:id", middleware.isLoggedIn, (req,res) => {
	
	Item.findById(req.params.id,function(err, itemFound){
		if (err || !itemFound){
			req.flash("error", "Item not found!");
			res.redirect("/list");
		}else{
			res.render("items/show", {item:itemFound})
		}
	})
})

//show edit form
router.get("/list/:id/edit", middleware.isLoggedIn, (req, res) =>{
	Item.findById(req.params.id, (err, itemFound) => {
		if (err || !itemFound){
			req.flash("error", "Item not found!");
			res.redirect("/list")
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


//update bought (can now click on bought btn again and undo it)
router.put("/list/:id/bought", (req, res)=> {
	Item.findById(req.params.id,(err, itemFound) =>{
		if (err){
			res.redirect("back");
		}else{ //found the item
			if(itemFound.bought === false){ //check if bought is false or true
				Item.findByIdAndUpdate(req.params.id,{$set:{bought:true}}, (err, itemUpdated)=>{
					if (err){
						res.redirect("back");
						
					}else{
						req.flash("success", "Successfully updated a new item!");
						// res.redirect("/list/" + req.params.id);
						res.redirect("/list");
						
					}
				});
			}else{
				Item.findByIdAndUpdate(req.params.id,{$set:{bought:false}}, (err, itemUpdated)=>{
					if (err){
						res.redirect("back");
					}else{
						req.flash("success", "Successfully updated a new item!");
						// res.redirect("/list/" + req.params.id);
						res.redirect("/list");
					}
				});
			};
		}		
	});
});


//fav btn (can now click on fav btn again and undo it)
router.put("/list/:id/fav", (req, res)=> {
	Item.findById(req.params.id,(err, itemFound) =>{
		if (err){
			res.redirect("back");
		}else{ //found the item
			if(itemFound.fav === false){ //check if bought is false or true
				Item.findByIdAndUpdate(req.params.id,{$set:{fav:true}}, (err, itemUpdated)=>{
					if (err){
						res.redirect("back");
					}else{
						req.flash("success", "Successfully updated a new item!");
						// res.redirect("/list/" + req.params.id);
						res.redirect("/list");
					}
				});
			}else{
				Item.findByIdAndUpdate(req.params.id,{$set:{fav:false}}, (err, itemUpdated)=>{
					if (err){
						res.redirect("back");
					}else{
						req.flash("success", "Successfully updated a new item!");
						// res.redirect("/list/" + req.params.id);
						res.redirect("/list");
					}
				});
			};
		}		
	});
});




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
