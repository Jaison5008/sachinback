
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{ type:String,required:true},
        
        mobile:{type:String,default:'000-000-0000'},
        password:{type:String,required:true},
        role:{type:String,default:'user'},
        createdAt:{type:Date,default:Date.now}
    })
    


let UserModel = mongoose.model('user',UserSchema)
module.exports={UserModel}