var express = require("express")
var router = express.Router({ mergeParams : true  });
router.use(function(req,res,next){
    res.locals.User = req.user
    next();
})
var Campground = require("../models/campgrounds")
var newComment = require("../models/newComment")
var deleteComment = require("../models/deleteComment")
var updatedComment = require("../models/updateComment")
var editComment = require("../models/editComment")
var middleware = require("../middleware") //index file is automatically required
router.get("/new",middleware.isLoggedIn,function(req,res){
    var id = req.params.id;
    Campground.findById(id,function(err,foundCampground){
        if(err){
            res.send(err)
        }else{
            res.render("comments/new",{campground : foundCampground})
        }
    })
})

router.post("/",middleware.isLoggedIn,newComment)
router.get("/edit/:commentId",middleware.isLoggedIn,editComment)
router.put("/edit/:commentId",middleware.isLoggedIn,updatedComment)
router.get("/delete/:commentId",middleware.isLoggedIn,deleteComment)

module.exports = router