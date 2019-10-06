middlewareObj= {};
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error","Please Login First")
        res.redirect("/signin")
    }
}
module.exports = middlewareObj