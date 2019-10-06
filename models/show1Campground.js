var Campground = require("./campgrounds");
var User = require("./user")
function showOneCampground(req,res){
    var id = req.params.id
    Campground.findById(id).populate("comments").exec(function(error,foundCampground){
        if(error){
            console.log(error)
            res.send(error)
        }
        else{
            if(req.user != undefined){
                User.findById(foundCampground.author.id,function(err,foundUser){
                    if(err){
                        res.render("/campgrounds")
                    }else{
                        res.render("campgrounds/show.ejs",{author : foundUser,loggedInUserId : req.user.id ,validity : 1, campground : foundCampground})
                    }
                })
            }else{
                res.render("campgrounds/show.ejs",{validity : 0, campground : foundCampground})
            }
        }
    })
   
    //findById IS THE FUNCTION WHICH IS USED TO FIND A PARTICULAR OBJECT WITH ITS ID WHICH IS STORED IN ITS DATABASE
   
    
}

module.exports = showOneCampground