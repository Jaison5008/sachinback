const mongoose = require('mongoose');

let ticketDisplay= new mongoose.Schema(
    { 
        
        classA:{type:String,default:" class A 500"},
        classB:{
            type:String,
            default:"class B 2500"},
            
            
            
       
        
    })
    


let Ticket = mongoose.model('ticket',ticketDisplay)
module.exports={Ticket}