const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const itemSchema = new mongoose.Schema ({
	name: String,
	brand: String,
	year: String,
	retail: String,
	image: String,	
	description: String
});

module.exports = mongoose.model("Item", itemSchema);

