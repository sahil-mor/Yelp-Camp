var campground = require("./campgrounds")
function deleteCampground(req,res){
    campground.findByIdAndDelete(req.params.campgroundId,function(err,foundCampground){
        if(err){
            req.flash("error","Campground Cannot Be Deleted")
            res.redirect("/campgrounds/" + req.params.campgroundId)
        }else{
            req.flash("success","Campground Deleted Successfully")
            res.redirect("/campgrounds")
        }
    })
}

module.exports = deleteCampground