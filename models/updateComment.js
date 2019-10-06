Comment = require("./comment")
function updatedComment(req,res){
    Comment.findById(req.params.commentId,function(err,comment){
        if(err){
            req.flash("error","Problem In Editing Comment")
            res.redirect("/campgrounds/"  + req.params.id)   
        }else{
            comment.text = req.body.text;
            comment.save(function(err,savedComment){
                if(err){
                    req.flash("error","Problem In Editing Comment")
                    res.redirect("/campgrounds/"  + req.params.id)
                }else{
                    Comment.findByIdAndUpdate(comment.id,savedComment,function(err,updatedComment){
                        if(err){
                            req.flash("error","Problem In Editing Comment")
                            res.redirect("/campgrounds/"  + req.params.id)
                        }else{
                            req.flash("success","Comment Saved Successfully")
                            res.redirect("/campgrounds/"  + req.params.id)
                        }
                    })
                }
            })
        }
    })
}
module.exports = updatedComment