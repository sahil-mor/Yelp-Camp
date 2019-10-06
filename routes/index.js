var express = require("express")
var passport = require("passport");
var router = express.Router();
var User = require("../models/user")
router.get("/",function(req,res){
    res.render("landing")
})

router.get("/signup",function(req,res){
    res.render("signup")
})

router.post("/signup",function(req,res){
    User.register(new User({username : req.body.username}),req.body.password,function(err,newUser){
        if(err){
            console.log(err)
            return res.render("signup")
        }else{
            res.redirect("/campgrounds")
        }
    })
})

router.get("/signin",function(req,res){
    res.render("signin")
})

router.post("/signin",passport.authenticate("local",{
    failureRedirect : "/signup"
}),function(req,res){
    req.flash("success","Welcome Back, " + req.user.username)
    res.redirect("/campgrounds")
})

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out!!!")
    res.redirect("/signin")
})

module.exports = router