var express = require('express');
var router = express.Router();
const {Cart} = require('../Shema/cart')
 const {validates}=require('../comon/bcrypt')

var router=express.Router();

router.post('/post',async(req,res)=>{
try{  
   const user  =await Cart.findOne({userid:req.body.userid , matchid:req.body.matchid})  
   console.log(user)
   if(!user){
    const matchCart=await Cart.create(req.body); 
    
 res.status(200).send({matchCart,message:"Cart created"})} 
    
    else{ throw {error:"user already booked"}} 
}
catch(error){  
  if(error){ 
    res.status(401).send({error:error.error}) 
  }else{
  res.status(500).send({error:"server error"})}
}
})

router.get('/get',validates,async(req,res)=>{
    try{ 
        let cartList=await Cart.find(); 
        if(cartList){
        res.status(200).send({message:"match get",data:cartList})}else{res.status(401).send({message:"match null"})}
    }
    catch(err){res.status(500).send({error:err.message})}
    })   


    router.get('/get/:id/:matchid',async(req,res)=>{
      try{  
        console.log(req.params)
          let cartList=await Cart.findOne({userid:req.params.id,matchid:req.params.matchid});  
          console.log(cartList)
          if(cartList){
          res.status(200).send({message:"cart get",data:cartList})}else{res.status(401).send({message:"match null"})}
      }
      catch(err){res.status(500).send({error:err.message})}
      })   

      router.get('/geting/:id',async(req,res)=>{
        try{ 
            let cartList=await Cart.find({userid:req.params.id}); 
            if(cartList){
            res.status(200).send({message:"cart get",data:cartList})}else{res.status(401).send({message:"match null"})}
        }
        catch(err){res.status(500).send({error:err.message})}
        })  
  


    



    
        router.patch('/put/:id',async(req,res)=>{
            try {
              let cartList= await Cart.findOne({_id:req.params.id})
              if(cartList)
              {
                cartList.matchid= req.body.matchid
                cartList.userid= req.body.userid
                cartList.ticketid= req.body.ticketid 
                cartList.Total=req.body.Total 
                cartList.Numofticket=req.body.Numofticket
                await cartList.save()
          
                res.status(200).send({
                  message:"cart Updated Successfully!"
                })
              }
              else
              {
                res.status(400).send({message:"cart Not Exists!"})
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
          const ss=   await Cart.findOne({_id:req.params.id}) 
          if(ss){  
            await Cart.deleteOne({_id:req.params.id})
            res.status(200).send({message:"cart deleted sucess"})
          } 
          else
          {  
            res.status(400).send({message:"no cart available data"})

          }
          
            } catch (error) {
              res.status(500).send({
                message:"Internal Server Error",
                error
              })
            }
          }) 


          
module.exports=router;