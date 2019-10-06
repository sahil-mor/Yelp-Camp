var Campground = require("./campgrounds");
var Comment = require("./comment")

function NewComment(req,res){
    console.log(req.user)
    Comment.create({
        text : req.body.text,
        
    },function(err,newComment){
        if(err){
            req.flash("error","Comment Cannot Created")
            res.redirect("/campgrounds/" + req.params.id)
        }
        else{
            console.log(req.params.id)
            Campground.findById(req.params.id,function(error,foundCampground){
                if(error){
                    req.flash("error","Comment Cannot Created")
                    res.redirect("/campgrounds/" + req.params.id)
                }
                else{
                    newComment.author.username = req.user.username
                    newComment.author.id = req.user.id
                    newComment.save(function(err,savedComment){
                        if(err){
                            req.flash("error","Problem In Saving Comment")
                            res.redirect("/campgrounds/" + req.params.id)
                        }else{
                            foundCampground.comments.push(savedComment)
                            foundCampground.save();
                            req.flash("success","Comment Successfully Added")
                            res.redirect("/campgrounds/" + foundCampground._id)
                        }
                    })
                    
                }
            })
        }
    })
}

module.exports = NewComment