const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash                 = require('connect-flash');
const User = require("./models/user");
const Item = require("./models/item");
const methodOverride = require('method-override');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const indexRoutes = require('./routes/index');
const itemsRoutes = require('./routes/items');

mongoose.connect('mongodb://localhost:27017/personal_project', {useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "palace is fire",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// this middleware function passes req.user to every route
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.primary = req.flash("primary");
   next();
});

app.set("view engine", "ejs");
app.use(indexRoutes);
app.use(itemsRoutes);




app.listen(3000, function(){
	console.log("server started!");
})