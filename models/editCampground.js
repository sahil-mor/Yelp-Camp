var mongoose = require("mongoose")
var Campground = require("./campgrounds")
function editCampground(req,res){
    if(req.user.id == req.params.authorId){
        Campground.findById(req.params.campgroundId,function(err,foundCampground){
            if(err){
                req.flash("success","Campground Cannot Be Edited")
                res.redirect("/campgrounds/" + req.params.campgroundId)
            }else{
                res.render("campgrounds/edit",{ campground : foundCampground,authorId : req.params.authorId })
            }
        })
    }else{
        req.flash("error","You Cannot Edit This Camground")
        res.redirect("/campgrounds/" + req.params.campgroundId)
    }
}
module.exports = editCampground