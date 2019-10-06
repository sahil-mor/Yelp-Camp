var Campground = require("./campgrounds")

function NewCampground(req,res){
    var newCampground ={ name :req.body.name , image : req.body.image ,description : req.body.description };
    Campground.create(newCampground,function(error,campground){
        if(error){
            req.flash("error","Campground Cannot Created")
            res.redirect("/campgrounds")
        }
        else{
            campground.author.id = req.user.id;
            campground.author.username = req.user.username
            campground.save(function(err,savedCampground){
                if(err){
                    req.flash("error","Problem In Saving Campground")
                    res.redirect("/campgrounds/new")
                }else{
                    req.flash("success","Campground Created Successfully")
                    res.redirect("/campgrounds")
                }
            })
        }
    })
}

module.exports = NewCampground;