var express = require("express")
var router = express.Router();
var showCampgrounds = require("../models/showCampground")
var newCampground = require("../models/newCampground")
var showOneCampground = require("../models/show1Campground")
var editCampground = require("../models/editCampground")
deleteCampground = require("../models/deleteCampground")
updateCampground = require("../models/updateCampgrounds")

var middleware = require("../middleware")
//INDEX - ROUTE - SHOW ALL THE CAMPGROUNDS
router.get("/",showCampgrounds)

//CREATE - WHICH WILL MEKE NEW CAMPGROUND
router.post("/",middleware.isLoggedIn,newCampground)

//NEW - WHICH WILL SHOW THE FORM    
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new")
})

//SHOW WILL SHOW A PARTICULAR CAMPGROUND WHICH CAN BE OBTAINED ITS ID : /basic/:id - GET REQUEST
//this should be at the bottom
router.get("/:id",showOneCampground)

router.get("/edit/:campgroundId/By/:authorId",middleware.isLoggedIn,editCampground)
router.put("/edit/:campgroundId/By/:authorId",middleware.isLoggedIn,updateCampground)
router.get("/delete/:campgroundId",middleware.isLoggedIn,deleteCampground)

module.exports = router