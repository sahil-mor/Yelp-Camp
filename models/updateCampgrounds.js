var Campground = require("./campgrounds")
function update(req,res){
    Campground.findById(req.params.campgroundId,function(err,campground){
        if(err){
            req.flash("error","Problem In Editing Campground")
            res.redirect("/campgrounds/" + req.params.campgroundId)
        }else{
            campground.name =  req.body.name; campground.image =  req.body.image,campground.description =  req.body.description;
            campground.save(function(err,savedCampground){
                if(err){
                    req.flash("error","Problem In Editing Campground")
                    res.redirect("/campgrounds/" + req.params.campgroundId)  
                }else{
                   Campground.findByIdAndUpdate(campground.id,savedCampground,function(err,updatedCampground){
                       if(err){
                        req.flash("error","Problem In Editing Campground")
                        res.redirect("/campgrounds/" + req.params.campgroundId)  
                       }else{
                        req.flash("success","Campground Edited Successfully")
                        res.redirect("/campgrounds/" + req.params.campgroundId)  
                       }
                   }) 
                }
            })
        }
    })
}
module.exports = update