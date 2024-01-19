const mongoose = require('mongoose');

let cartDisplay= new mongoose.Schema(
    {
    matchid:{type:String,required:true}, 
    userid:{type:String,required:true}, 
    team:{type:String,required:true}, 
    venue:{type:String,required:true}, 
   
    ticketclass:{type:String,required:true}, 
    
   
    Numofticket:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
     
        
    })
    


let Cart= mongoose.model('cart',cartDisplay)
module.exports={Cart}