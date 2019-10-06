Comment = require("./comment")
Campground = require("./campgrounds")
function editComment(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error","Comment Cannot Edited")
            res.redirect("/campgrounds/"  + req.params.id)
        }else{
            Comment.findById(req.params.commentId,function(err,foundComment){
                if(err){
                    req.flash("error","Comment Cannot Edited")
                    res.redirect("/campgrounds/"  + req.params.id)
                }else{
                    res.render("comments/edit",{comment : foundComment , campground : foundCampground})
                }
            })
        }
    })
}
module.exports = editComment