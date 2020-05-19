const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const itemSchema = new mongoose.Schema ({
	name: String,
	brand: String,
	year: String,
	retail: String,
	front_image: String,
	back_image:String,
	description: String
});

module.exports = mongoose.model("Item", itemSchema);

