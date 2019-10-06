var Comment = require("./comment")
function deleteComment(req,res){
    Comment.findByIdAndDelete(req.params.commentId,function(err,comment){
        if(err){
            req.flash("error","Comment Cannot Be Deleted")
            res.redirect("/campgrounds/" + req.params.id)
        }else{
            req.flash("success","Comment Deleted Successfully")
            res.redirect("/campgrounds/"  + req.params.id)
        }
    })
}
module.exports = deleteComment