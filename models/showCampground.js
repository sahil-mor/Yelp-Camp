var Campground = require("./campgrounds")

function ShowCampground(req,res){
   //req.user has the information of logged in user
    Campground.find(function(error,campgrounds){
        if(error){
            console.log(error)
        }
        else{
                res.render("index",{campgrounds : campgrounds})
        }
    })
}

module.exports = ShowCampground