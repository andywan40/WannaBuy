const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const itemSchema = new mongoose.Schema ({
	name: String,
	color: String,
	brand: String,
	year: String,
	retail: String,
	front_image: String,
	back_image:String,
	description: String,
	website: {type: String, default: '#' },
	type: String,
	author: String,
	bought: {type: Boolean, default: false},
	fav: {type: Boolean, default: false}
});

module.exports = mongoose.model("Item", itemSchema);
