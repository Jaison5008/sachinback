var express = require('express');
var router = express.Router();
const {Match} = require('../Shema/match')


var router=express.Router();

router.post('/post',async(req,res)=>{
try{ 
    let matchlist=await Match.create(req.body); 
    if(matchlist){
    res.status(201).send({message:"match created"})}else{res.status(401).send({message:"null"})}
}
catch(err){res.status(500).send({error:err.message})}
})

router.get('/get',async(req,res)=>{
    try{ 
        let matchlist=await Match.find(); 
        if(matchlist){
        res.status(200).send({message:"match get",data:matchlist})}else{res.status(401).send({message:"match null"})}
    }
    catch(err){res.status(500).send({error:err.message})}
    })  




    router.get('/get/:id',async(req,res)=>{
      try{ 
          let matchlist=await Match.findOne({_id:req.params._id}); 
          if(matchlist){
          res.status(200).send({message:"match get",data:matchlist})}else{res.status(401).send({message:"match null"})}
      }
      catch(err){res.status(500).send({error:err.message})}
      }) 



    
        router.put('/put/:id',async(req,res)=>{
            try {
              let matchlist= await Match.findOne({_id:req.params.id})
              if(matchlist)
              {
                matchlist.venue= req.body.venue
                matchlist.teams= req.body.teams
                matchlist.time= req.body.time
                await matchlist.save()
          
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
          const ss=   await Match.findOne({_id:req.params._id}) 
          if(ss){  
            await Match.deleteOne({_id:req.params.id})
            res.status(200).send({message:"match deleted sucess"})
          } 
          else
          {  
            res.status(400).send({message:"no  match available data"})

          }
          
            } catch (error) {
              res.status(500).send({
                message:"Internal Server Error",
                error
              })
            }
          }) 



module.exports=router;