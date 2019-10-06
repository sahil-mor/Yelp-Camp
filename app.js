var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")
var passport = require("passport");
var LocalStratergy = require("passport-local")
var methodOverride = require("method-override")

app.use(methodOverride("_method"))
var User = require("./models/user")
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")
var flash  = require("connect-flash")
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.use(flash());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

app.use(require("express-session")({
    secret : "This is a demo",
    resave : false,
    saveUninitialized :false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
    res.locals.User = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})

app.use("/campgrounds/:id/comments" ,commentRoutes)
app.use("/campgrounds",campgroundRoutes)
app.use(indexRoutes)

app.listen(3000,function(){
    console.log("YELP SERVER IS STARTED AT 3000")
})
