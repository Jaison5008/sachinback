const mongoose = require('mongoose');

let MatchDisplay= new mongoose.Schema(
    {
        venue:{type:String,required:true},
        teams:{
            type:String,
            required:true,
            
            
            },
        
        time:{type:String,default:'000-000-0000'},
        
    })
    


let Match = mongoose.model('match',MatchDisplay)
module.exports={Match}