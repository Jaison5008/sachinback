var express = require('express');
var router = express.Router();
const {Ticket} = require('../Shema/ticket')
const {validate}=require('../comon/bcrypt')


    router.get('/get',validate,async(req,res)=>{
        try{ 
            let ticketList=await Ticket.find(); 
            if(ticketList){
            res.status(200).send({message:"ticket get",data:ticketList})} 
            else{res.status(401).send({message:"ticket null"})}
        }
        catch(error){res.status(500).send({error:'internal server error'}) } 
    
      })



    router.post("/post",async(req,res)=>{
try{
let ticketlistlist=await Ticket.create(req.body)
if(ticketlistlist){
res.status(200).send({message:"ticket list created",data:ticketlistlist}) 
}else{res.status(401).send({message:"null"})}
}
    catch(err){res.status(500).send({error:err.message})}



    })  

    router.put('/put/:id',async(req,res)=>{
        try {
          let ticketlist= await Ticket.findOne({_id:req.params.id})
          if(ticketlist)
          {
            ticketlist.matchid= req.body.matchid
            ticketlist.classA= req.body.classA
            ticketlist.classB= req.body.classB
            await ticketlist.save()
      
            res.status(200).send({
              message:"User Updated Successfully!"
            })
          }
          else
          {
            res.status(400).send({message:"User Does Not Exists!"})
          }
      
        } catch (err) {
          return res.status(500).send({
            message:"Internal Server Error",
            error:err.message
          })
        }
      }) 



      router.delete('/delete/:id',async(req,res)=>{
        try {
      const ss=   await Ticket.findOne({_id:req.params._id}) 
      if(ss){  
        await Ticket.deleteOne({_id:req.params.id})
        res.status(200).send({message:"ticket deleted sucess"})
      } 
      else
      {  
        res.status(400).send({message:"not ticket available data"})

      }
      
        } catch (error) {
          res.status(500).send({
            message:"Internal Server Error",
            error
          })
        }
      }) 




    module.exports = router;