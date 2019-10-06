var mongoose = require("mongoose")
var passportLocalStratergy = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    username : String,
    passsword : String
})

userSchema.plugin(passportLocalStratergy)
module.exports = mongoose.model("User",userSchema)